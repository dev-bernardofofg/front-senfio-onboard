/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import fetch from '../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../client.ts'
import type {
  RetrieveDeleteRedemptionQueryResponse,
  RetrieveDeleteRedemptionPathParams,
  RetrieveDeleteRedemption400,
  RetrieveDeleteRedemption401,
  RetrieveDeleteRedemption403,
  RetrieveDeleteRedemption404,
  RetrieveDeleteRedemption409,
  RetrieveDeleteRedemption417,
  RetrieveDeleteRedemption500,
  RetrieveDeleteRedemption501,
} from './models/RetrieveDeleteRedemption.ts'

function getRetrieveDeleteRedemptionUrl({ id }: { id: RetrieveDeleteRedemptionPathParams['id'] }) {
  return `/api/v1/coupons/redemptions/${id}` as const
}

/**
 * @description Obtém ou remove um resgate específico.
 * @summary Detalhes do Resgate
 * {@link /api/v1/coupons/redemptions/:id}
 */
export async function retrieveDeleteRedemption(
  { id }: { id: RetrieveDeleteRedemptionPathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config

  const res = await request<
    RetrieveDeleteRedemptionQueryResponse,
    ResponseErrorConfig<
      | RetrieveDeleteRedemption400
      | RetrieveDeleteRedemption401
      | RetrieveDeleteRedemption403
      | RetrieveDeleteRedemption404
      | RetrieveDeleteRedemption409
      | RetrieveDeleteRedemption417
      | RetrieveDeleteRedemption500
      | RetrieveDeleteRedemption501
    >,
    unknown
  >({ method: 'GET', url: getRetrieveDeleteRedemptionUrl({ id }).toString(), ...requestConfig })
  return res
}