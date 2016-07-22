import request from 'request'
import Promise from 'bluebird'

export default Promise.promisify(request)
