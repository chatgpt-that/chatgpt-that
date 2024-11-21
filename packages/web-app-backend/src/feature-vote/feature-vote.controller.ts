import { Express, Request, Response } from 'express';
import { FeatureVoteService } from './feature-vote.service.js';

export class FeatureVoteController {
  app: Express;
  featureVoteService: FeatureVoteService;

  constructor(app: Express) {
    this.createFeatureVote=this.createFeatureVote.bind(this);
    this.app = app;
    this.featureVoteService = new FeatureVoteService();
    console.log('[Server]: API Availble - POST /api/feature-vote');
    this.app.post('/api/feature-vote', this.createFeatureVote as any);
  }

  async createFeatureVote(req: Request, res: Response) {
    try {
      const { email, vote } = req.body;
      if (!email) return res.status(400).send('Missing email field');
      if (!vote) return res.status(400).send('Missing vote field');
      await this.featureVoteService.createFeatureVote({ email, vote });
      res.status(200).send();

    } catch (error) {
      console.error(`[Server]: Error creating/updating feature-vote - ${error}`);
      res.status(500).send(error);
    }
  }

}
