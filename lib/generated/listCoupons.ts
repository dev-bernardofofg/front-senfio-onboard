/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import fetch from '../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../client.ts'
import type {
  ListCouponsQueryResponse,
  ListCouponsQueryParams,
  ListCoupons400,
  ListCoupons401,
  ListCoupons403,
  ListCoupons404,
  ListCoupons409,
  ListCoupons417,
  ListCoupons500,
  ListCoupons501,
} from './models/ListCoupons.ts'

function getListCouponsUrl() {
  return `/api/v1/coupons` as const
}

/**
 * @description Lista todos os cupons disponíveis.
 * @summary Listar Cupons
 * {@link /api/v1/coupons}
 */
export async function listCoupons(params?: ListCouponsQueryParams, config: Partial<RequestConfig> & { client?: typeof fetch } = {}) {
  const { client: request = fetch, ...requestConfig } = config

  const res = await request<
    ListCouponsQueryResponse,
    ResponseErrorConfig<ListCoupons400 | ListCoupons401 | ListCoupons403 | ListCoupons404 | ListCoupons409 | ListCoupons417 | ListCoupons500 | ListCoupons501>,
    unknown
  >({ method: 'GET', url: getListCouponsUrl().toString(), params, ...requestConfig })
  return res
}