import 'reflect-metadata'
import {Action, BadRequestError, createKoaServer} from "routing-controllers"
import TeacherController from './teachers/controller'
import LoginController from './logins/controller'
import BatchController from './batches/controller'
import {verify} from './jwt'

export default createKoaServer({
  cors: true,
  controllers: [
    TeacherController,
    LoginController,
    BatchController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
})
