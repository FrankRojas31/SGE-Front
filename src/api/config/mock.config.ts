/**
 * Configuración global de MOCKEO
 *
 * Puedes habilitar/deshabilitar el mockeo simplemente cambiando esta variable
 * o mediante una variable de entorno: VITE_USE_MOCK=true
 */

// Usar variable de entorno si existe, de lo contrario usar la variable local
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || false

// Simulación de delay de red para hacer el mockeo más realista
export const MOCK_DELAY_MS = 300

/**
 * Función helper para activar/desactivar mockeo en tiempo de ejecución
 * Útil para debugging y testing
 */
let mockEnabled = USE_MOCK

export const setMockEnabled = (enabled: boolean) => {
  mockEnabled = enabled
  console.log(`[MOCK] Mockeo: ${enabled ? 'HABILITADO' : 'DESHABILITADO'}`)
}

export const isMockEnabled = (): boolean => mockEnabled
