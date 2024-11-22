import { Express, Request, Response } from 'express';
import { FeedbackService } from './feedback.service.js';
import { AuthenticateUserMiddleware } from '../../___middlewares/authenticate-user.js';

export class FeedbackController {
  app: Express;
  feedbackService: FeedbackService;

  constructor(app: Express) {
    this.createFeedback=this.createFeedback.bind(this);
    this.app = app;
    this.feedbackService = new FeedbackService();
    console.log('[Server]: API Availble - POST /api/feedback');
    app.post('/api/feedback', AuthenticateUserMiddleware as any, this.createFeedback as any);
  }

  async createFeedback(req: Request, res: Response) {
    try {
      const { message } = req.body;
      const { email } = (req as any).auth;
      if (!email) return res.status(401).send('Missing email from auth id_token');
      if (!message) return res.status(400).send('Missing message field');
      await this.feedbackService.createFeedback({ email, message });
      res.send();

    } catch (error) {
      console.error(`[Server]: Error creating feedback - ${error}`);
      res.status(500).send(error);
    }
  }

}
