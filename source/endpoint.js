// @flow
import request from './utils/async-request'
import join from './utils/join'
import buildPath from './utils/build-path'
import API from './api'
import mergeConfigs from './utils/merge-configs'

import type { ParamsObject, ConfigSet, RequestOptions } from './types'

type ConfigOptPair = {options: RequestOptions, config: ConfigSet}

function buildURLForPOST(urlTemplate: string): Function {
  return ({ options, config }: ConfigOptPair): ConfigOptPair => {
    const {url, params} = buildPath(urlTemplate, config.params)

    let bodyParams: ParamsObject = {}
    let qsParams: ParamsObject = {}

    for (let pName of config.qsParams) {
      if (pName in params) {
        qsParams[pName] = params[pName]
      } else {
        bodyParams[pName] = params[pName]
      }
    }

    return {
      options: {
        ...options,
        url,
        qs: {
          ...options.qs||{},
          ...qsParams,
        },
        body: {
          ...options.body||{},
          ...bodyParams,
        },
      },
      config: {
        ...config,
        params: qsParams,
      },
    }
  }
}

function buildURLForGET(urlTemplate: string): Function {
  return ({ options, config }: ConfigOptPair): ConfigOptPair => {
    const {url, params} = buildPath(urlTemplate, config.params)

    return {
      options: {
        ...options,
        url,
        qs: {
          ...options.qs||{},
          ...params,
        },
      },
      config: {
        ...config,
        params,
      },
    }
  }
}

function applyParams({ options, config }: ConfigOptPair): ConfigOptPair {
  return {
    options: {
      ...options,
      qs: {
        ...options.qs,
        ...config.params,
      },
    },
    config,
  }
}

function applyHeaders({ options, config }: ConfigOptPair): ConfigOptPair {
  return {
    options: {
      ...options,
      headers: {
        ...options.headers,
        ...config.headers,
      },
    },
    config,
  }
}

type EndpointInitializer = {
  method: string,
} & ConfigSet

export default class Endpoint {
  api: API
  path: string
  method: string

  config: ConfigSet

  constructor(api: API, path: string, {
    method = 'GET',

    headers = {},
    params = {},
    responseTransform,
    qsParams = [],
  }: EndpointInitializer = {}) {
    if (method === 'GET' && qsParams.length) {
      console.warn("All query params for GET requests are included in the query string, so no need to pass `qsParams` option.") // eslint-disable-line no-console
    }

    this.path = path
    this.api = api
    this.method = method

    this.config = {
      headers,
      params,
      responseTransform,
      qsParams,
    }
  }

  get mergedConfig(): ConfigSet {
    return mergeConfigs(this.api.config, this.config)
  }

  get fullBaseURI(): string {
    return join(this.api.base, this.path)
  }

  actionOptions(params: ParamsObject): ConfigOptPair {
    const config = mergeConfigs(this.mergedConfig, {
      params,
      headers: {},
      qsParams: [],
      responseTransform: null,
    })

    const urlBuilder = this.method === 'GET' ? buildURLForGET : buildURLForPOST

    const transforms: Function[] = [
      urlBuilder(this.fullBaseURI),
      applyParams,
      applyHeaders,
    ]

    let req: ConfigOptPair = transforms.reduce((pair: ConfigOptPair, trans: Function) => {
      // make a quick copy so object remains pure
      return trans(pair)
    }, {options: {}, config})

    return req
  }

  performAction(params: ParamsObject) {
    let {options, config} = this.actionOptions(params)

    return request(options)
      .then(config.responseTransform)
  }
}
