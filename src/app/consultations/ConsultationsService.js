import { FirestoreCrudService } from '~/utils/FirestoreCrudService'

/**
*
* @class consultationsService
*/
class ConsultationsService extends FirestoreCrudService {
  constructor () {
    super('consultations')
  }
}

export const consultationsService = new ConsultationsService()
