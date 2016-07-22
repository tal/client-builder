import buildPath from '../../source/utils/build-path'

function fit() {}

describe('buildPath', () => {
  it('should round trip with nothing', () => {
    const params = {
      foo: 'bar',
    }

    const result = buildPath('/my/path', params)

    expect(result.params).toEqual(params)
    expect(result.url).toEqual('/my/path')
  })

  it('should remove param', () => {
    const params = {
      foo: 'bar',
      foo2: 'baz',
    }

    const result = buildPath('/my/:foo/path', params)

    expect(result.params).toEqual({
      foo2: 'baz',
    })
    expect(params).toEqual({
      foo: 'bar',
      foo2: 'baz',
    })
    expect(result.url).toEqual('/my/bar/path')
  })

  fit('should remove optionals', () => {
    const params = {
      foo: 'bar',
      baz: 'omg',
    }

    const result = buildPath('/my(/:whatever)(/:baz)/path', params)

    expect(result.params).toEqual(params)
    expect(result.url).toEqual('/my/omg/path')
  })
})
