import request from './utils/async-request'
import join from './utils/join'
import buildPath from './utils/build-path'
import qs from 'qs'

function optionsForGet(stuff, options) {
  let params = qs.stringify(stuff.params)

  return {
    ...options,
    url: stuff.url + '?' + params,
  }
}

function optionsForPost(stuff, options) {
  return {
    ...options,
    url: stuff.url,
    form: stuff.params,
  }
}

function identity(i) { return i }

export default class Endpoint {
  constructor(api, path, {
    method = 'GET',
    params = {},
    headers = {},
    responseTransform = identity,
  } = {}) {
    this.path = path
    this.api = api

    this.headers = headers
    this.params = params
    this.method = method
    this.responseTransform = responseTransform
  }

  actionOptions({params = {}, headers = {}} = {}) {
    params = this.api.params({
      ...this.params,
      ...params,
    })

    headers = this.api.headers({
      ...this.headers,
      ...headers,
    })

    let stuff = buildPath(join(this.api.base, this.path), params)

    let options = {
      headers,
      method: this.method,
    }

    options = this.method === 'GET' ? optionsForGet(stuff, options) : optionsForPost(stuff, options)

    console.log('options', options)

    return options
  }

  performAction(options = {}) {
    return request(this.actionOptions(options))
      .then(this.api.responseTransform)
      .then(this.responseTransform)
  }
}
