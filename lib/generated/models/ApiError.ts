/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

/**
 * @description Serializer para erros de API.
 */
export type ApiError = {
  /**
   * @description Código do erro
   * @type string
   */
  code: string
  /**
   * @description Mensagem de erro
   * @type string
   */
  message: string
  /**
   * @description Detalhes do erro
   * @type object | undefined
   */
  errors?: {
    [key: string]: string[]
  }
}