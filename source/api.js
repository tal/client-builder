// @flow
import Endpoint from './endpoint'

import type {ConfigSet, OptionalConfigSet} from './types'

type APIInitilizer = {
  base: string,
} & OptionalConfigSet

export default class API {
  base: string
  config: ConfigSet

  constructor({
    base,

    headers = {},
    params = {},
    responseTransform,
    qsParams = [],
  }: APIInitilizer = {}) {
    this.base = base;

    this.config = {
      headers,
      params,
      responseTransform,
      qsParams,
    }
  }

  buildEndpoint(...args: Array<any>) {
    return new Endpoint(this, ...args)
  }
}
