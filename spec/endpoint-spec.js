// @flow

import API from '../source/api.js'
import Endpoint from '../source/endpoint.js'

describe('Endpoint', () => {

  describe('empty api', () => {
    const api = new API({
        base: 'base',
    })

    describe('path', () => {
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

      it('should work with post', () => {
        const endpoint = new Endpoint(api, path, {
          method: 'POST',
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

        expect(options).toEqual({
          url: 'base/path/foo',
          body: {
            bar: 'bar',
            endpoint: 'true',
            override: 'true',
          },
          qs: {},
          headers: {},
          json: true,
          method: 'POST',
        })
      })

      it('should work with post', () => {
        const endpoint = new Endpoint(api, path, {
          method: 'POST',
          qsParams: ['inQs'],
          params: {
            foo: 'foo',
            endpoint: 'true',
            override: 'false',
          },
        })

        const {options} = endpoint.actionOptions({
          bar: 'bar',
          override: 'true',
          inQs: 'true',
        })

        expect(options).toEqual({
          url: 'base/path/foo',
          body: {
            bar: 'bar',
            endpoint: 'true',
            override: 'true',
          },
          qs: {
            inQs: 'true',
          },
          headers: {},
          json: true,
          method: 'POST',
        })
      })

    })

  })
})
