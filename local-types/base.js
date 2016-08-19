type ParamsObject = { [key:string]: string }

type ConfigSet = {
  headers: ParamsObject,
  params: ParamsObject,
  responseTransform: ?Function,
  qsParams: string[],
}

type OptionalConfigSet = {
  headers?: ParamsObject,
  params?: ParamsObject,
  responseTransform?: ?Function,
  qsParams?: string[],
}

type RequestOptions = {
  url?: string,
  method?: string,
  headers?: ParamsObject,
  qs?: ParamsObject,
  body?: ParamsObject,
  json?: bool,
}
