// @flow

import type { ConfigSet } from '../types'

function identity<T>(i:T): T { return i }

function composeFunctions(func1: ?Function, func2: ?Function): ?Function {
  if (func1 && func2) {
    let f1: Function = func1
    let f2: Function = func2
    return function(arg) {
      return f1(f2(arg))
    }
  } else if (func1 || func2) {
    return func1 || func2
  } else {
    return null
  }
}

export default function mergeConfigs(...configs: ConfigSet[]): ConfigSet {

  let finalConfig: ConfigSet = {
    headers: {},
    params: {},
    responseTransform: identity,
    qsParams: [],
  }

  for (let config of configs) {
    finalConfig = {
      headers: {
        ...finalConfig.headers,
        ...config.headers||{},
      },
      params: {
        ...finalConfig.params,
        ...config.params||{},
      },
      responseTransform: composeFunctions(finalConfig.responseTransform, config.responseTransform),
      qsParams: [
        ...finalConfig.qsParams,
        ...config.qsParams||[],
      ],
    }
  }

  return finalConfig
}
