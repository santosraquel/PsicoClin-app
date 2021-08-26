import { FirestoreCrudService } from '~/utils/FirestoreCrudService'

/**
*
* @class usersService
*/
class UsersService extends FirestoreCrudService {
  constructor () {
    super('users')
  }
}

export const usersService = new UsersService()
