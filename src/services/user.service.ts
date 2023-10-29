import { User } from './user.schema'

class UserService {
  repository: any

  constructor() {
    this.repository = null
  }

  createUser(user: User, newPost: {}) {
    throw 'Not implemented'
  }

  findByUsername(username: string) {
    throw 'Not implemented'
  }
}

export default UserService
