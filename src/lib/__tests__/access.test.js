// Invariantes del muro de pago. access.js es el ÚNICO sitio que decide si una
// cuenta entra al producto, así que un fallo aquí es o bien regalar el
// producto o bien echar a alguien que ha pagado.
//
// Lo que más se vigila: que ningún campo que el usuario pueda escribir desde
// el cliente conceda acceso por su cuenta. La contrapartida en firestore.rules
// (touchesPaidFields) impide escribirlos; este test impide que alguien añada
// aquí una vía nueva sin darse cuenta.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  hasAccess, accessReason, hasActiveSubscription,
  subscriptionWarning, annualSavings, ACTIVE_STATUSES, PLANS,
} from '../access.js'

describe('hasActiveSubscription', () => {
  it('deja pasar los estados vivos de Stripe', () => {
    for (const status of ACTIVE_STATUSES) {
      expect(hasActiveSubscription({ status })).toBe(true)
    }
  })

  it('past_due sigue dando acceso: Stripe aún está reintentando el cobro', () => {
    expect(hasActiveSubscription({ status: 'past_due' })).toBe(true)
  })

  it('rechaza los estados muertos y la ausencia de suscripción', () => {
    for (const status of ['canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'paused', 'none']) {
      expect(hasActiveSubscription({ status })).toBe(false)
    }
    expect(hasActiveSubscription(undefined)).toBe(false)
    expect(hasActiveSubscription({})).toBe(false)
  })
})

describe('hasAccess', () => {
  it('sin usuario no hay acceso', () => {
    expect(hasAccess(null)).toBe(false)
    expect(hasAccess(undefined)).toBe(false)
  })

  it('una cuenta recién creada no tiene acceso', () => {
    expect(hasAccess({ name: 'Ana', email: 'ana@example.com' })).toBe(false)
  })

  it('legacyFree entra (grandfathering)', () => {
    expect(hasAccess({ legacyFree: true })).toBe(true)
    expect(accessReason({ legacyFree: true })).toBe('legacy')
  })

  it('legacyFree solo cuenta si es exactamente true', () => {
    // Un valor "truthy" cualquiera no debe abrir el muro: si un día algo
    // escribe legacyFree: 'no' o legacyFree: 0, debe fallar cerrado.
    for (const value of ['true', 1, {}, 'yes']) {
      expect(hasAccess({ legacyFree: value })).toBe(false)
    }
  })

  it('una suscripción familiar viva entra', () => {
    expect(hasAccess({ subscription: { status: 'active', plan: 'family_annual' } })).toBe(true)
    expect(accessReason({ subscription: { status: 'trialing' } })).toBe('subscription')
  })

  it('una suscripción cancelada no entra', () => {
    expect(hasAccess({ subscription: { status: 'canceled' } })).toBe(false)
    expect(accessReason({ subscription: { status: 'canceled' } })).toBe(null)
  })

  it('un profesor con la suscripción viva entra al producto, no solo al panel', () => {
    expect(hasAccess({ teacherProfile: { active: true, subscriptionStatus: 'active' } })).toBe(true)
    expect(accessReason({ teacherProfile: { active: true, subscriptionStatus: 'active' } })).toBe('teacher')
  })

  it('un profesor sin suscripción ni código no entra', () => {
    expect(hasAccess({ teacherProfile: { active: true, subscriptionStatus: 'canceled' } })).toBe(false)
    expect(hasAccess({ teacherProfile: { active: false, subscriptionStatus: 'active' } })).toBe(false)
  })

  it('el alumno patrocinado entra por el flag denormalizado', () => {
    expect(hasAccess({ sponsoredByTeacher: { active: true, teacherId: 't1' } })).toBe(true)
    expect(accessReason({ sponsoredByTeacher: { active: true, teacherId: 't1' } })).toBe('sponsored')
  })

  it('el patrocinio caducado no entra', () => {
    expect(hasAccess({ sponsoredByTeacher: { active: false, teacherId: 't1' } })).toBe(false)
  })

  it('estar en la clase de un profesor NO basta por sí solo', () => {
    // linkedTeacherIds lo escribe el propio alumno al unirse a una clase
    // (joinClassByCode), así que si concediera acceso bastaría con inventarse
    // un uid para saltarse el muro. El acceso viene de sponsoredByTeacher,
    // que solo escribe Admin.
    expect(hasAccess({ linkedTeacherIds: ['t1', 't2'] })).toBe(false)
  })
})

describe('ninguna vía de acceso depende de un campo escribible por el cliente', () => {
  // Estos son los campos que el usuario SÍ puede escribir en su propio doc
  // (upsertUserProfile, joinClassByCode, el formulario de profesor sin código
  // válido). Ninguna combinación de ellos puede abrir el muro.
  const clientWritable = {
    name: 'Hacker',
    email: 'x@example.com',
    photoURL: 'https://example.com/a.png',
    linkedTeacherIds: ['t1'],
    teacherProfile: { active: true, schoolName: 'X', stage: 'eso' },
  }

  it('no dan acceso ni juntos', () => {
    expect(hasAccess(clientWritable)).toBe(false)
    expect(accessReason(clientWritable)).toBe(null)
  })
})

describe('subscriptionWarning', () => {
  it('avisa de un cobro fallido aunque siga dando acceso', () => {
    expect(hasAccess({ subscription: { status: 'past_due' } })).toBe(true)
    expect(subscriptionWarning({ status: 'past_due' })).toBe('payment_failed')
  })

  it('avisa de una suscripción que termina a fin de periodo', () => {
    expect(subscriptionWarning({ status: 'active', cancelAtPeriodEnd: true })).toBe('ending')
  })

  it('no avisa de una suscripción sana', () => {
    expect(subscriptionWarning({ status: 'active' })).toBe(null)
    expect(subscriptionWarning(null)).toBe(null)
  })
})

describe('PLANS', () => {
  it('coincide con los precios configurados en Stripe', () => {
    // Si cambian en Stripe y no aquí, la landing anuncia un precio y el
    // checkout cobra otro.
    expect(PLANS.family_monthly.price).toBe(9.99)
    expect(PLANS.family_annual.price).toBe(69.99)
  })

  it('el anual sale más barato que 12 meses (si no, no hay razón para elegirlo)', () => {
    expect(PLANS.family_annual.price).toBeLessThan(PLANS.family_monthly.price * 12)
  })

  it('annualSavings cuadra con los precios', () => {
    const s = annualSavings()
    expect(s.amount).toBe(49.89)          // 119,88 − 69,99
    expect(s.percent).toBe(42)
    expect(s.equivalentMonthly).toBe(5.83)
    // El reclamo solo es honesto si el ahorro es real y notable.
    expect(s.percent).toBeGreaterThan(0)
    expect(s.equivalentMonthly).toBeLessThan(PLANS.family_monthly.price)
  })

  it('todo plan tiene etiqueta en los tres idiomas', () => {
    for (const [id, plan] of Object.entries(PLANS)) {
      for (const lang of ['es', 'en', 'ca']) {
        expect(plan.label[lang], `${id}.label.${lang}`).toBeTruthy()
      }
    }
  })

  it('cada plan familiar del servidor tiene precio y etiqueta en el cliente', () => {
    // api/_plans.js decide qué se puede comprar; PLANS decide cómo se anuncia.
    // Si se añade un plan allí y se olvida aquí, la landing lo ofrecería sin
    // precio — o peor, no lo ofrecería y nadie se daría cuenta.
    const server = readFileSync(new URL('../../../api/_plans.js', import.meta.url), 'utf8')
    const familyPlans = [...server.matchAll(/^\s{2}(\w+):\s*\{[^}]*audience: '(\w+)'/gm)]
      .filter(([, , audience]) => audience === 'family')
      .map(([, id]) => id)

    expect(familyPlans.length).toBeGreaterThan(0)
    for (const id of familyPlans) {
      expect(PLANS[id], `falta el plan "${id}" en PLANS`).toBeDefined()
    }
  })

  it('los planes del cliente son solo familiares (el de profesor va aparte)', () => {
    // El plan de profesor se contrata desde /profesores con su propia página y
    // su propio precio; colarlo en PLANS lo sacaría en la landing de familias.
    expect(PLANS.teacher).toBeUndefined()
  })
})
