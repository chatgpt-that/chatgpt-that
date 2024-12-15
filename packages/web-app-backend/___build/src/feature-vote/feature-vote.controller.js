import { FeatureVoteService } from './feature-vote.service.js';
import { AuthenticateUserMiddleware } from '../../___middlewares/authenticate-user.js';
export class FeatureVoteController {
    app;
    featureVoteService;
    constructor(app) {
        this.getFeatureVote = this.getFeatureVote.bind(this);
        this.createFeatureVote = this.createFeatureVote.bind(this);
        this.app = app;
        this.featureVoteService = new FeatureVoteService();
        console.log('[Server]: API Availble - GET /api/feature-vote');
        console.log('[Server]: API Availble - POST /api/feature-vote');
        this.app.get('/api/feature-vote', AuthenticateUserMiddleware, this.getFeatureVote);
        this.app.post('/api/feature-vote', AuthenticateUserMiddleware, this.createFeatureVote);
    }
    async getFeatureVote(req, res) {
        try {
            const { email } = req.auth;
            if (!email)
                return res.status(401).send('Missing email from auth id_token');
            const featureVote = await this.featureVoteService.getFeatureVote({ email });
            res.status(200).json(featureVote);
        }
        catch (error) {
            console.error(`[Server]: Fetching feature vote - ${error}`);
            res.status(500).send(error);
        }
    }
    async createFeatureVote(req, res) {
        try {
            const { vote } = req.body;
            const { email } = req.auth;
            if (!email)
                return res.status(401).send('Missing email from auth id_token');
            if (vote === undefined)
                return res.status(400).send('Missing vote field');
            if (vote > 2)
                return res.status(400).send('Invalid vote option');
            await this.featureVoteService.createFeatureVote({ email, vote });
            res.status(200).send();
        }
        catch (error) {
            console.error(`[Server]: Error creating/updating feature-vote - ${error}`);
            res.status(500).send(error);
        }
    }
}
