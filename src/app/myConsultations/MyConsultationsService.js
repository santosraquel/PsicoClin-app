import { FirestoreCrudService } from '~/utils/FirestoreCrudService'

/**
*
* @class consultationsService
*/
class MyConsultationsService extends FirestoreCrudService {
  constructor () {
    super('myConsultations')
  }
}

export const myConsultationsService = new MyConsultationsService()
