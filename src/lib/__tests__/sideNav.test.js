// La barra lateral sale en las páginas de navegar y en los paneles de clase,
// nunca dentro de un juego, un examen o el reto que se proyecta en clase.
import { describe, it, expect } from 'vitest'
import { conBarraLateral } from '../../components/SideNav'

describe('conBarraLateral', () => {
  it('sí en páginas de navegar y paneles', () => {
    for (const p of ['/', '/en', '/ca/', '/juegos', '/juegos/eso', '/juegos/eso/lengua', '/estudiar/historia', '/top',
      '/profesores', '/profesor', '/en/profesor', '/profesor/clase/abc123', '/clase', '/perfil', '/recursos/funciones'])
      expect(conBarraLateral(p), p).toBe(true)
  })
  it('no dentro de un juego, un examen ni un reto proyectado', () => {
    for (const p of ['/juegos/portadas', '/en/juegos/fuerza-neta', '/examen/prehistoria', '/reto', '/reto/ABC123',
      '/profesor/reto/ABC123', '/profesor/examenes/x1', '/profesor/examenes/x1/imprimir', '/clase/examen/t1', '/admin'])
      expect(conBarraLateral(p), p).toBe(false)
  })
})
