import Endpoint from './endpoint'

const id = (res) => res

export default class API {
  constructor({
    base = null,
    headers = {},
    params = {},
    responseTransform = id,
  } = {}) {
    this.base = base;
    this._headers = headers
    this._params = params
    this.responseTransform = responseTransform
  }

  params(otherParams) {
    return {
      ...this._params,
      ...otherParams,
    }
  }

  headers(otherHeaders) {
    return {
      ...this._headers,
      ...otherHeaders,
    }
  }

  buildEndpoint(...args) {
    return new Endpoint(this, ...args)
  }
}
