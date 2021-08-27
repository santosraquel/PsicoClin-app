import { FirestoreCrudService } from '~/utils/FirestoreCrudService'

/**
*
* @class personsServices
*/
class PersonsService extends FirestoreCrudService {
  constructor () {
    super('persons')
  }
}

export const personsService = new PersonsService()
