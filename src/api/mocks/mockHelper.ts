import { isMockEnabled, MOCK_DELAY_MS } from '../config/mock.config'
import type { ResponseHelper } from '@/types/ResponseHelper'

/**
 * Simula el delay de una petición de red
 */
export const simulateNetworkDelay = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
}

/**
 * Envuelve datos mockeados en la estructura de ResponseHelper
 * que todos los servicios esperan
 */
export const mockResponse = async <T>(data: T): Promise<ResponseHelper<T>> => {
  if (!isMockEnabled()) return null as any

  await simulateNetworkDelay()

  return {
    success: true,
    message: 'Mock data',
    data,
  } as ResponseHelper<T>
}

/**
 * Maneja errores en respuestas mockeadas
 */
export const mockErrorResponse = async <T>(
  message: string,
  code: string = 'ERROR',
): Promise<ResponseHelper<T>> => {
  if (!isMockEnabled()) return null as any

  await simulateNetworkDelay()

  return {
    success: false,
    message,
    data: null,
  } as ResponseHelper<T>
}
