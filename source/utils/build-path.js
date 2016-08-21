// @flow

import type { ParamsObject } from '../types'

export default function buildPath(sourcePath: string, paramsIn: ParamsObject): {params: ParamsObject, url: string} {
  let pathParamReg = /(?::(\w+))/g

  let params = Object.assign({}, paramsIn)

  let path = sourcePath.replace(pathParamReg, (orig, key) => {
    let val

    if (key in params) {
      val = params[key]
      delete params[key]
    } else {
      val = orig
    }

    return val
  })

  return {
    params,
    url: path,
  }
}
