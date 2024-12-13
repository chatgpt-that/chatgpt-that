import cors from 'cors';
import { Express, Request, Response } from 'express';
import { ConversationService } from './conversation.service.js';
import { AuthenticateUserMiddleware } from '../../___middlewares/authenticate-user.js';

export class ConversationController {
  app: Express;
  conversationService: ConversationService;

  constructor(app: Express) {
    this.app = app;
    this.getConversation=this.getConversation.bind(this);
    this.addToConversation=this.addToConversation.bind(this);
    this.deleteConversation=this.deleteConversation.bind(this);
    this.conversationService = new ConversationService();

    console.log('[Server]: API Available - POST /api/conversation/retrieve');
    this.app.options('/api/conversation/retrieve', cors({ origin: '*' }));
    this.app.post('/api/conversation/retrieve', cors({ origin: '*' }), AuthenticateUserMiddleware as any, this.getConversation as any);

    console.log('[Server]: API Available - POST /api/conversation/message');
    this.app.options('/api/conversation/message', cors({ origin: '*' }));
    this.app.post('/api/conversation/message', cors({ origin: '*' }), AuthenticateUserMiddleware as any, this.addToConversation as any)

    console.log('[Server]: API Available - DELETE /api/conversation');
    this.app.options('/api/conversation', cors({ origin: '*' }));
    this.app.delete('/api/conversation', cors({ origin: '*' }), AuthenticateUserMiddleware as any, this.deleteConversation as any)
  }

  async getConversation(req: Request, res: Response) {
    try {
      const { email } = (req as any).auth;
      const { websiteUrl } = req.body;
      if (!websiteUrl) return res.status(400).send('Missing websiteUrl field');
      if (!email) return res.status(401).send('Missing email from auth id_token');
      const conversation = await this.conversationService.getConversation({ userEmail: email, websiteUrl });
      return res.status(200).send(conversation?.conversation ?? []);

    } catch (err) {
      console.error(`[Server]: getConversation error - ${err}`);
      res.status(500).send(err);
    }
  }

  async deleteConversation(req: Request, res: Response) {
    try {
      const { email } = (req as any).auth;
      if (!email) return res.status(401).send('Missing email from auth id_token');
      const { websiteUrl } = req.body;
      console.log({websiteUrl});
      const conversation = await this.conversationService.conversationRepository.model.findOne({
        website_url: websiteUrl, 
        user_email: email 
      });
      if (!conversation) return res.status(404).send('Conversation does not exist or user cannot delete conversation');
      await this.conversationService.deleteConversation({ id: conversation.id });
      return res.end();

    } catch (err) {
      console.error(`[Server]: deleteConversation error - ${err}`);
      res.status(500).send(err);
    }
  }

  async addToConversation(req: Request, res: Response) {
    try {
      const { email } = (req as any).auth;
      if (!email) return res.status(401).send('Missing email from auth id_token');
      const { websiteUrl, imageDataUrl, query } = req.body;
      if (!websiteUrl) throw 'Missing websiteUrl field';
      if (!query) throw 'Missing query field';
      const conversation = 
        await this.conversationService.addToConversation({ userEmail: email, websiteUrl, imageDataUrl, query });
      return res.status(200).send(conversation);

    } catch (err) {
      console.error(`[Server]: addToConversation error - ${err}`);
      res.status(500).send(err);
    }
  }

}
