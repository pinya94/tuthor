// Puentes — motor de simulación estructural sobre Matter.js.
// Aislado de React: recibe el estado de construcción (nodos + piezas) y una
// config de nivel, monta un mundo físico y expone tick()/getState()/destroy().
//
// Modelo (aproximado, NO ingenieril):
//  - Nodo → Matter.Body circular. Anclajes = estáticos; nodos del jugador =
//    dinámicos con masa pequeña (self-weight de la estructura).
//  - Pieza → Matter.Constraint entre dos nodos. Viga = stiffness alta (tensión y
//    compresión). Cable = solo tensión: si se acorta, queda flojo (stiffness 0).
//  - Carga → fuerza descendente aplicada cada tick al nodo dinámico más cercano
//    al punto de carga (fija) o a la posición móvil que recorre el vano.
//  - Tensión de cada pieza = |ΔL|/L normalizado por su breakStrain → ratio 0..1.
//    ratio > 1 rompe la pieza (se elimina del mundo y colapsa).

import Matter from 'matter-js'
import { PIECE_TYPES, SIM } from '../data/puentesLevels'

const { Engine, Composite, Bodies, Body, Constraint } = Matter

const NODE_R = 7

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

/**
 * @param {{nodes:Array,pieces:Array}} construction
 * @param {object} level
 * @param {{onBreak?:Function,onWin?:Function,onLose?:Function}} cbs
 */
export function createSim(construction, level, cbs = {}) {
  const engine = Engine.create()
  engine.gravity.y = SIM.gravity
  engine.constraintIterations = 6
  engine.positionIterations = 10
  engine.velocityIterations = 8

  // ── Nodos ───────────────────────────────────────────────────────────────────
  const nodeBodies = new Map() // nodeId → body
  const originY = new Map()    // nodeId → y inicial (para detectar hundimiento)
  const dynamicNodes = []      // bodies dinámicos (candidatos a recibir carga)

  for (const n of construction.nodes) {
    const body = Bodies.circle(n.x, n.y, NODE_R, {
      isStatic: !!n.fixed,
      frictionAir: 0.06,
      collisionFilter: { group: -1 }, // los nodos no colisionan entre sí
    })
    if (!n.fixed) {
      Body.setMass(body, SIM.nodeMass)
      Body.setInertia(body, Infinity) // sin rotación: se comporta como una junta
      dynamicNodes.push(body)
    }
    nodeBodies.set(n.id, body)
    originY.set(n.id, n.y)
    Composite.add(engine.world, body)
  }

  // ── Piezas (constraints) ──────────────────────────────────────────────────────
  const pieceMeta = [] // { id, type, a, b, constraint, restLength, def, ratio, sign, broken }
  for (const p of construction.pieces) {
    const bodyA = nodeBodies.get(p.a)
    const bodyB = nodeBodies.get(p.b)
    if (!bodyA || !bodyB) continue
    const def = PIECE_TYPES[p.type]
    if (!def) continue
    const restLength = dist(bodyA.position, bodyB.position)
    const constraint = Constraint.create({
      bodyA, bodyB,
      length: restLength,
      stiffness: def.stiffness,
      damping: 0.1,
    })
    Composite.add(engine.world, constraint)
    pieceMeta.push({
      id: p.id, type: p.type, a: p.a, b: p.b,
      constraint, restLength, def,
      ratio: 0, sign: 'none', broken: false,
    })
  }

  // ── Carga ──────────────────────────────────────────────────────────────────
  // Puntos de carga: uno móvil que recorre el vano, o uno/varios fijos (carga
  // distribuida). Cada punto necesita un nodo bajo su vertical (SUPPORT_DX); si
  // no lo hay, es un hueco sin apoyo y la carga cae → colapso. La fuerza se
  // aplica al nodo dinámico más cercano en horizontal, que es quien la soporta.
  const isMoving = level.load.type === 'moving'
  const loadPoints = isMoving
    ? [{ x: level.load.fromX, y: level.load.y, mass: level.load.mass, moving: true }]
    : (level.load.points ?? [{ x: level.load.x, y: level.load.y }])
        .map(p => ({ x: p.x, y: p.y ?? level.load.y, mass: p.mass ?? level.load.mass, moving: false }))

  // Nodo más cercano en x (todos, incluidos anclajes) → sirve de "apoyo".
  function nearestByX(x) {
    let best = null, bestDx = Infinity
    for (const [id, body] of nodeBodies) {
      const dx = Math.abs(body.position.x - x)
      if (dx < bestDx) { bestDx = dx; best = { id, body } }
    }
    return best ? { ...best, dx: bestDx } : null
  }
  // Nodo dinámico más cercano en x dentro de un margen (recibe la fuerza).
  function nearestDynamicByX(x, within) {
    let best = null, bestDx = within
    for (const b of dynamicNodes) {
      const dx = Math.abs(b.position.x - x)
      if (dx <= bestDx) { bestDx = dx; best = b }
    }
    return best
  }
  // Reparte una fuerza descendente entre los dos nodos dinámicos que flanquean x
  // (como las dos ruedas de un coche): evita picos irreales sobre un solo miembro.
  function applyDistributed(x, force, within) {
    const near = dynamicNodes
      .map(b => ({ b, dx: Math.abs(b.position.x - x) }))
      .filter(o => o.dx <= within)
      .sort((p, q) => p.dx - q.dx)
      .slice(0, 2)
    if (near.length === 0) return
    if (near.length === 1) {
      Body.applyForce(near[0].b, near[0].b.position, { x: 0, y: force })
      return
    }
    const sum = near[0].dx + near[1].dx || 1
    const w0 = near[1].dx / sum   // el más cercano recibe más
    Body.applyForce(near[0].b, near[0].b.position, { x: 0, y: force * w0 })
    Body.applyForce(near[1].b, near[1].b.position, { x: 0, y: force * (1 - w0) })
  }

  // ── Estado del bucle ──────────────────────────────────────────────────────────
  let stableTicks = 0
  let collapseTicks = 0         // ticks extra para mostrar el colapso antes de cerrar
  let outcome = null            // null | 'win' | 'lose'
  let firstBreak = null         // { id, type, sign }
  let loseReason = null         // 'break' | 'sag'
  let progress = 0

  function finish(kind) {
    if (outcome) return
    outcome = kind
    if (kind === 'win') cbs.onWin?.()
    else cbs.onLose?.({ reason: loseReason, piece: firstBreak })
  }

  function tick() {
    if (outcome) return

    // Carga: apoyo (hueco) + fuerza sobre la estructura, por cada punto.
    let gap = false
    for (const lp of loadPoints) {
      if (lp.moving) {
        lp.x = Math.min(lp.x + SIM.movingSpeed, level.load.toX)
        progress = (lp.x - level.load.fromX) / (level.load.toX - level.load.fromX)
      }
      const support = nearestByX(lp.x)
      if (!support || support.dx > SIM.supportDx) { gap = true; continue }
      const force = lp.mass * SIM.loadForceK
      if (lp.moving) {
        applyDistributed(lp.x, force, SIM.supportDx)
      } else {
        const target = nearestDynamicByX(lp.x, SIM.supportDx)
        if (target) Body.applyForce(target, target.position, { x: 0, y: force })
      }
    }
    if (gap && !loseReason) loseReason = 'gap'

    Engine.update(engine, 1000 / 60)

    // Evalúa la tensión de cada pieza
    for (const m of pieceMeta) {
      if (m.broken) continue
      const cur = dist(m.constraint.bodyA.position, m.constraint.bodyB.position)
      const delta = cur - m.restLength

      if (m.def.tensionOnly) {
        if (delta <= 0) {
          m.constraint.stiffness = 0   // cable flojo: no empuja
          m.ratio = 0
          m.sign = 'slack'
          continue
        }
        m.constraint.stiffness = m.def.stiffness
        m.ratio = (delta / m.restLength) / m.def.breakStrain
        m.sign = 'tension'
      } else {
        m.ratio = (Math.abs(delta) / m.restLength) / m.def.breakStrain
        m.sign = delta > 0 ? 'tension' : 'compression'
      }

      if (m.ratio > 1) {
        m.broken = true
        m.ratio = 1
        Composite.remove(engine.world, m.constraint)
        if (!firstBreak) firstBreak = { id: m.id, type: m.type, sign: m.sign }
        cbs.onBreak?.({ id: m.id, type: m.type, sign: m.sign })
        loseReason = 'break'
      }
    }

    // Hundimiento: algún nodo cae más de lo permitido respecto a su origen
    let sagged = false
    for (const [id, body] of nodeBodies) {
      if (body.isStatic) continue
      if (body.position.y - originY.get(id) > SIM.sagLimit) { sagged = true; break }
    }
    if (sagged && !loseReason) loseReason = 'sag'

    // Desenlace. Tras un fallo seguimos simulando ~1s para que se vea el
    // colapso (los cuerpos liberados caen) antes de cerrar con onLose.
    if (loseReason) {
      // El hueco no tiene nada que animar; el resto muestra el colapso ~1s.
      if (loseReason === 'gap') { finish('lose'); return }
      collapseTicks++
      if (collapseTicks >= 60) finish('lose')
      return
    }
    if (isMoving) {
      if (loadPoints[0].x >= level.load.toX) { stableTicks++; if (stableTicks > 30) finish('win') }
    } else {
      stableTicks++
      if (stableTicks >= SIM.settleTicks) finish('win')
    }
  }

  function getState() {
    return {
      outcome,
      progress,
      firstBreak,
      loseReason,
      nodes: construction.nodes.map(n => {
        const b = nodeBodies.get(n.id)
        return { id: n.id, fixed: n.fixed, x: b.position.x, y: b.position.y }
      }),
      pieces: pieceMeta.map(m => {
        const a = m.constraint.bodyA.position
        const b = m.constraint.bodyB.position
        return {
          id: m.id, type: m.type, ratio: m.ratio, sign: m.sign, broken: m.broken,
          ax: a.x, ay: a.y, bx: b.x, by: b.y,
        }
      }),
      loads: loadPoints.map(lp => ({ x: lp.x, y: lp.y, type: level.load.type })),
    }
  }

  function destroy() {
    outcome = outcome || 'destroyed'
    Composite.clear(engine.world, false)
    Engine.clear(engine)
    nodeBodies.clear()
    dynamicNodes.length = 0
    pieceMeta.length = 0
  }

  return { tick, getState, destroy, NODE_R }
}

export { NODE_R }
