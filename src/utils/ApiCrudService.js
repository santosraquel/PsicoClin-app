import { API_URL } from './apiURL'
import { planeObject } from '~/utils'
import AbstracService from '~/utils/AbstractService'

/**
 * Abstract Service for CRUD Operations in REST full API
 */
export class ApiCrudService extends AbstracService {
  constructor (path) {
    super()

    this.baseUrl = API_URL

    this.baseUrl += 'api/' + path

    this.refereces = []
  }

  save (obj, isUpdate = false) {
    const data = planeObject(obj)
    this.flatRefs(data)
    if (!isUpdate) {
      return this.request().post('/', data)
        .then(({ data }) => (data))
    } else {
      return this.request().put(`/${obj._id}`, data)
        .then(({ data }) => (data))
    }
  }

  flatRefs (data) {
    // Auto flat refereces
    this.refereces.forEach((field) => {
      data[field] = data[field] ? data[field]._id : ''
    })
  }

  get (_id, params) {
    return this.request().get('/' + _id)
      .then(({ data }) => (data))
  }

  list (params) {
    return this.request().get('/', { params })
      .then(({ data }) => (data))
  }

  remove (data) {
    return this.request().delete('/' + data._id)
      .then(({ data }) => (data))
  }
}
