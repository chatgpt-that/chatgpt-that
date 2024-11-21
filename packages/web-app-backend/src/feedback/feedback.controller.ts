import { Express, Request, Response } from 'express';
import { FeedbackService } from './feedback.service.js';

export class FeedbackController {
  app: Express;
  feedbackService: FeedbackService;

  constructor(app: Express) {
    this.createFeedback=this.createFeedback.bind(this);
    this.app = app;
    this.feedbackService = new FeedbackService();
    console.log('[Server]: API Availble - POST /api/feedback');
    app.post('/api/feedback', this.createFeedback as any);
  }

  async createFeedback(req: Request, res: Response) {
    try {
      const { email, message } = req.body;
      if (!email) return res.status(400).send('Missing email field');
      if (!message) return res.status(400).send('Missing message field');
      await this.feedbackService.createFeedback({ email, message });
      res.send();

    } catch (error) {
      console.error(`[Server]: Error creating feedback - ${error}`);
      res.status(500).send(error);
    }
  }

}
