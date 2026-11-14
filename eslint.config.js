import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.claude']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Solo afecta al refresco en caliente en desarrollo, y aquí es norma
      // exportar datos junto a componentes (registros de arte, TEMAS…): daba
      // 512 de los 860 errores y tapaba los fallos de verdad (no-undef…).
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // api/ y scripts/ corren en Node (funciones de Vercel y scripts de
    // mantenimiento), no en el navegador: sin esto, `process` y `Buffer` se
    // reportan como no definidos y el lint de esos ficheros era ruido.
    files: ['api/**/*.js', 'scripts/**/*.{js,mjs}'],
    languageOptions: { globals: globals.node },
  },
])
