import joinPath from '../../source/utils/join'

describe('joinPath', () => {
  it('should work with leading', () => {
    expect(joinPath('/foo', '/bar', '/baz')).toEqual('/foo/bar/baz')
  })

  it('should work with leading', () => {
    expect(joinPath('foo', 'bar', 'baz')).toEqual('foo/bar/baz')
  })

  it('should work with leading', () => {
    expect(joinPath('foo/', '/bar/', '/baz/')).toEqual('foo/bar/baz/')
  })

  it('should work with leading', () => {
    expect(joinPath('', 'foo/', '/bar/', '/baz/')).toEqual('/foo/bar/baz/')
  })

  it('should work with leading', () => {
    expect(joinPath('', '/foo/', '/bar/', '/baz/')).toEqual('/foo/bar/baz/')
  })

  it('should work with leading', () => {
    expect(joinPath('/', 'foo/', '/bar/', '/baz/')).toEqual('/foo/bar/baz/')
  })
})
