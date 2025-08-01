/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { ApiError } from './ApiError.ts'
import type { TeamEnum } from './TeamEnum.ts'
import type { User } from './User.ts'

export type Register = {
  /**
   * @maxLength 254
   * @type string, email
   */
  email: string
  /**
   * @type string
   */
  password: string
  team?: TeamEnum
  /**
   * @type string, date
   */
  works_since: string
}

export type Register201 = User

export type Register400 = ApiError

/**
 * @description Usuário não autenticado.
 */
export type Register401 = ApiError

/**
 * @description Permissão negada para o recurso solicitado.
 */
export type Register403 = ApiError

/**
 * @description Recurso procurado não encontrado.
 */
export type Register404 = ApiError

/**
 * @description Um conflito ocorreu durante a solicitação.
 */
export type Register409 = ApiError

/**
 * @description Expectativa não atendida.
 */
export type Register417 = ApiError

/**
 * @description Erro interno do servidor.
 */
export type Register500 = ApiError

/**
 * @description Recurso solicitado ainda não foi implementado.
 */
export type Register501 = ApiError

export type RegisterMutationRequest = Register

export type RegisterMutationResponse = Register201

export type RegisterMutation = {
  Response: Register201
  Request: RegisterMutationRequest
  Errors: Register400 | Register401 | Register403 | Register404 | Register409 | Register417 | Register500 | Register501
}