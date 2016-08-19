import API from '../source/api.js'
import Endpoint from '../source/endpoint.js'

describe('Endpoint', () => {

  describe('empty api', () => {
    const api = new API({
        base: 'base',
    })

    describe('', () => {
      const path = '/path/:foo'
      const endpoint = new Endpoint(api, path, {
        headers: {'one': '1'},
      })

      it('should foo', () => {

        const {options} = endpoint.actionOptions({
          foo: 'foo',
          bar: 'bar',
        })

        expect(options.url).toEqual('base/path/foo')
        expect(options.qs).toEqual({
          bar: 'bar',
        })
        expect(options.headers).toEqual({
          one: '1',
        })
      })

      it('should foo', () => {
        const endpoint = new Endpoint(api, path, {
          headers: {'one': '1'},
          params: {
            foo: 'foo',
            endpoint: 'true',
            override: 'false',
          },
        })

        const {options} = endpoint.actionOptions({
          bar: 'bar',
          override: 'true',
        })

        expect(options.url).toEqual('base/path/foo')
        expect(options.qs).toEqual({
          bar: 'bar',
          endpoint: 'true',
          override: 'true',
        })
        expect(options.headers).toEqual({
          one: '1',
        })
      })

    })

  })
})
