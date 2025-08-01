/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { ApiError } from './ApiError.ts'
import type { GenericResponse } from './GenericResponse.ts'
import type { UserLogout } from './UserLogout.ts'

export type Logout205 = GenericResponse

export type Logout400 = ApiError

/**
 * @description Usuário não autenticado.
 */
export type Logout401 = ApiError

/**
 * @description Permissão negada para o recurso solicitado.
 */
export type Logout403 = ApiError

/**
 * @description Recurso procurado não encontrado.
 */
export type Logout404 = ApiError

/**
 * @description Um conflito ocorreu durante a solicitação.
 */
export type Logout409 = ApiError

/**
 * @description Expectativa não atendida.
 */
export type Logout417 = ApiError

/**
 * @description Erro interno do servidor.
 */
export type Logout500 = ApiError

/**
 * @description Recurso solicitado ainda não foi implementado.
 */
export type Logout501 = ApiError

export type LogoutMutationRequest = UserLogout

export type LogoutMutationResponse = Logout205

export type LogoutMutation = {
  Response: Logout205
  Request: LogoutMutationRequest
  Errors: Logout400 | Logout401 | Logout403 | Logout404 | Logout409 | Logout417 | Logout500 | Logout501
}