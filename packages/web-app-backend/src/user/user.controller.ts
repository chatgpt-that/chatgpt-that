import cors from 'cors';
import { Express, Request, Response } from 'express';
import { UserService } from './user.service.js';
import { AuthenticateUserMiddleware } from '../../___middlewares/authenticate-user.js';

export class UserController {
  app: Express;
  userService: UserService;

  constructor(app: Express) {
    this.findOrCreateUser=this.findOrCreateUser.bind(this);
    this.userService = new UserService();
    this.app = app;
    console.log(`[Server]: API Available - GET /api/user`);
    this.app.options('/api/user', cors({ origin: '*' }));
    this.app.get('/api/user', cors({ origin: '*' }), AuthenticateUserMiddleware as any, this.findOrCreateUser as any);
  } 

  async findOrCreateUser(req: Request, res: Response) {
    try {
      const { email } = (req as any).auth;
      if (!email) return res.status(401).send('Missing email from auth id_token');
      const user = await this.userService.findOrCreateOne({ email });
      return res.status(200).send(user);

    } catch (error) {
      console.error(`[Server]: Error retrieving user - ${error}`);
      res.status(500).send(error);
    }
  }

}
