import cors from 'cors';
import { AuthenticateUserMiddleware } from '../../___middlewares/authenticate-user.js';
import { Express, Request, Response } from 'express';
import { ChatService } from './chat.service.js';

export class ChatController {
  app: Express;
  chatService: ChatService;

  constructor(app: Express) {
    this.query=this.query.bind(this);
    this.chatService = new ChatService();
    this.app = app;
    console.log('[Server]: API Available - POST /api/chat/query');
    this.app.options('/api/chat/query', cors({ origin: '*' }));
    this.app.post('/api/chat/query', cors({ origin: '*' }), AuthenticateUserMiddleware as any, this.query as any);
  }

  async query(req: Request, res: Response) {
    try {
      const { imageDataUrl, queryText } = req.body;
      if (!imageDataUrl) return res.status(400).send('Missing imageDataUrl field');
      if (!queryText) return res.status(400).send('Missing queryText field');
      const { email } = (req as any).auth;
      if (!email) return res.status(401).send('Missing email from auth id_token');
      const queryResult = await this.chatService.query({ userEmail: email, queryText, imageDataUrl });
      return res.status(200).send(queryResult);
    } catch (err) {
      console.error(`[Server]: Chat query error - ${err}`);
      res.status(500).send(err);
    }
  }
}
