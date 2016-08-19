import mergeConfigs from '../../source/utils/merge-configs'

describe('mergeConfigs', () => {

  it('headers', () => {
    const confOne = {
      headers: {
        foo: 'foo',
        one: 'one',
      },
    }

    const confTwo = {
      headers: {
        one: 'two',
        two: 'two',
      },
    }

    const final = mergeConfigs(confOne, confTwo)

    expect(final.headers).toEqual({
      foo: 'foo',
      one: 'two',
      two: 'two',
    })
  })

  it('headers2', () => {
    const confOne = {
      headers: {
        foo: 'foo',
        one: 'one',
      },
    }

    const confTwo = {
      headers: {
        one: 'two',
        two: 'two',
      },
    }

    const final = mergeConfigs(confTwo, confOne)

    expect(final.headers).toEqual({
      foo: 'foo',
      one: 'one',
      two: 'two',
    })
  })

  it('should set headers if none', () => {
    const confOne = {
      headers: {
        foo: 'foo',
        one: 'one',
      },
    }

    const confTwo = {
    }

    const final = mergeConfigs(confTwo, confOne)

    expect(final.headers).toEqual({
      foo: 'foo',
      one: 'one',
    })
  })

  describe('transforms', () => {
    let callOrder

    const trans1 = (inP) => { callOrder.push(1); return {...inP, one: 1, foo: 1} }
    const trans2 = (inP) => { callOrder.push(2); return {...inP, one: 2, bar: 2} }

    const conf1 = {
      responseTransform: trans1,
    }

    const conf2 = {
      responseTransform: trans2,
    }

    beforeEach(() => {
      callOrder = []
    })

    it('should compose transforms', () => {
      const final = mergeConfigs(conf1, conf2)

      const resp = final.responseTransform()
      expect(callOrder).toEqual([2, 1])
      expect(resp).toEqual({
        one: 1,
        foo: 1,
        bar: 2,
      })
    })

    it('should compose transforms', () => {
      const final = mergeConfigs(conf2, conf1)

      const resp = final.responseTransform()
      expect(callOrder).toEqual([1, 2])
      expect(resp).toEqual({
        one: 2,
        foo: 1,
        bar: 2,
      })
    })
  })

})
