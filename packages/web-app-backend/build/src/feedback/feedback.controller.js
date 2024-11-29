import { FeedbackService } from './feedback.service.js';
import { AuthenticateUserMiddleware } from '../../___middlewares/authenticate-user.js';
export class FeedbackController {
    app;
    feedbackService;
    constructor(app) {
        this.createFeedback = this.createFeedback.bind(this);
        this.app = app;
        this.feedbackService = new FeedbackService();
        console.log('[Server]: API Availble - POST /api/feedback');
        app.post('/api/feedback', AuthenticateUserMiddleware, this.createFeedback);
    }
    async createFeedback(req, res) {
        try {
            const { message } = req.body;
            const { email } = req.auth;
            if (!email)
                return res.status(401).send('Missing email from auth id_token');
            if (!message)
                return res.status(400).send('Missing message field');
            await this.feedbackService.createFeedback({ email, message });
            res.send();
        }
        catch (error) {
            console.error(`[Server]: Error creating feedback - ${error}`);
            res.status(500).send(error);
        }
    }
}
