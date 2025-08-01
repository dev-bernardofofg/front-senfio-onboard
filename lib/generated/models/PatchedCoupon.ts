/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

export type PatchedCoupon = {
  /**
   * @type integer | undefined
   */
  readonly id?: number
  /**
   * @maxLength 50
   * @type string | undefined
   */
  code?: string
  /**
   * @type string | undefined
   */
  description?: string
  /**
   * @minLength 0
   * @maxLength 2147483647
   * @type integer
   */
  max_redemptions?: number | null
  /**
   * @type boolean | undefined
   */
  available?: boolean
  /**
   * @type string | undefined, date-time
   */
  readonly created_at?: string
}