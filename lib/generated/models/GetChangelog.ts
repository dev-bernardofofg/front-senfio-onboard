/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { ApiError } from './ApiError.ts'
import type { ChangelogResponse } from './ChangelogResponse.ts'

export type GetChangelog200 = ChangelogResponse

export type GetChangelog400 = ApiError

/**
 * @description Usuário não autenticado.
 */
export type GetChangelog401 = ApiError

/**
 * @description Permissão negada para o recurso solicitado.
 */
export type GetChangelog403 = ApiError

/**
 * @description Recurso procurado não encontrado.
 */
export type GetChangelog404 = ApiError

/**
 * @description Um conflito ocorreu durante a solicitação.
 */
export type GetChangelog409 = ApiError

/**
 * @description Expectativa não atendida.
 */
export type GetChangelog417 = ApiError

/**
 * @description Erro interno do servidor.
 */
export type GetChangelog500 = ApiError

/**
 * @description Recurso solicitado ainda não foi implementado.
 */
export type GetChangelog501 = ApiError

export type GetChangelogQueryResponse = GetChangelog200

export type GetChangelogQuery = {
  Response: GetChangelog200
  Errors: GetChangelog400 | GetChangelog401 | GetChangelog403 | GetChangelog404 | GetChangelog409 | GetChangelog417 | GetChangelog500 | GetChangelog501
}