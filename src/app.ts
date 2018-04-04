import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import { Action, BadRequestError } from "routing-controllers";
import LoginController from "./logins/controller";
import { verify } from "./jwt";

export const app = createKoaServer({
  cors: true,
  controllers: [LoginController],

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

    currentUserChecker: async (action: Action) => {
      const header: string = action.request.headers.authorization;
      if (header && header.startsWith("Bearer ")) {
        const [, token] = header.split(" ");

        if (token) {
          const { id } = verify(token);

          return { id };
        }
      }
      return {};
    }
});
