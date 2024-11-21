import { Express, Request, Response } from 'express';
import { WaitListService } from './waitlist.service.js';

export class WaitListController {
  app: Express;
  waitListService: WaitListService;

  constructor(app: Express) {
    this.joinWaitList=this.joinWaitList.bind(this);
    this.app = app;
    this.waitListService = new WaitListService();
    this.app.post('/api/waitlist', this.joinWaitList as any);
  }

  async joinWaitList(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).send('Missing email field');
      await this.waitListService.joinWaitList({ email });
      res.send('Joined WaitList');

    } catch (error) {
      console.error(`[Server]: Error joining waitlist - ${error}`);
      res.status(500).send(error);
    }
  }

}
