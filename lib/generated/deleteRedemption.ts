/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import fetch from '../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../client.ts'
import type {
  DeleteRedemptionMutationResponse,
  DeleteRedemptionPathParams,
  DeleteRedemption400,
  DeleteRedemption401,
  DeleteRedemption403,
  DeleteRedemption404,
  DeleteRedemption409,
  DeleteRedemption417,
  DeleteRedemption500,
  DeleteRedemption501,
} from './models/DeleteRedemption.ts'

function getDeleteRedemptionUrl({ id }: { id: DeleteRedemptionPathParams['id'] }) {
  return `/api/v1/coupons/redemptions/${id}` as const
}

/**
 * @description Remove um resgate específico.
 * @summary Remover Resgate
 * {@link /api/v1/coupons/redemptions/:id}
 */
export async function deleteRedemption({ id }: { id: DeleteRedemptionPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof fetch } = {}) {
  const { client: request = fetch, ...requestConfig } = config

  const res = await request<
    DeleteRedemptionMutationResponse,
    ResponseErrorConfig<
      | DeleteRedemption400
      | DeleteRedemption401
      | DeleteRedemption403
      | DeleteRedemption404
      | DeleteRedemption409
      | DeleteRedemption417
      | DeleteRedemption500
      | DeleteRedemption501
    >,
    unknown
  >({ method: 'DELETE', url: getDeleteRedemptionUrl({ id }).toString(), ...requestConfig })
  return res
}