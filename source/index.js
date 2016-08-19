import API from './api'
import Endpoint from './endpoint'

export {
  API,
  Endpoint,
}

const api = new API({
  base: 'http://requestb.in',
  qsParams: ['one'],
})

const endpoint = new Endpoint(api, '/1b0l3kw1', {
  method: 'POST',
})

endpoint.performAction({
  omg: 'wtf',
  hello: 'one',
  one: 'hay',
})
