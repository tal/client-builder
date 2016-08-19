// @flow

export type ParamsObject = { [key:string]: string }

export type ConfigSet = {
  headers: ParamsObject,
  params: ParamsObject,
  responseTransform: ?Function,
  qsParams: string[],
}

export type OptionalConfigSet = {
  headers?: ParamsObject,
  params?: ParamsObject,
  responseTransform?: ?Function,
  qsParams?: string[],
}

export type RequestOptions = {
  url?: string,
  method?: string,
  headers?: ParamsObject,
  qs?: ParamsObject,
  body?: ParamsObject,
  json?: bool,
}
