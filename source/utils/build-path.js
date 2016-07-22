export default function buildPath(sourcePath, params) {
  let pathParamReg = /(?::(\w+))/g

  params = Object.assign({}, params)

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
