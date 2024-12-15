import cors from 'cors';
import { ConversationService } from './conversation.service.js';
import { AuthenticateUserMiddleware } from '../../___middlewares/authenticate-user.js';
export class ConversationController {
    app;
    conversationService;
    constructor(app) {
        this.app = app;
        this.getConversation = this.getConversation.bind(this);
        this.addToConversation = this.addToConversation.bind(this);
        this.deleteConversation = this.deleteConversation.bind(this);
        this.conversationService = new ConversationService();
        console.log('[Server]: API Available - POST /api/conversation/retrieve');
        this.app.options('/api/conversation/retrieve', cors({ origin: '*' }));
        this.app.post('/api/conversation/retrieve', cors({ origin: '*' }), AuthenticateUserMiddleware, this.getConversation);
        console.log('[Server]: API Available - POST /api/conversation/message');
        this.app.options('/api/conversation/message', cors({ origin: '*' }));
        this.app.post('/api/conversation/message', cors({ origin: '*' }), AuthenticateUserMiddleware, this.addToConversation);
        console.log('[Server]: API Available - DELETE /api/conversation');
        this.app.options('/api/conversation', cors({ origin: '*' }));
        this.app.delete('/api/conversation', cors({ origin: '*' }), AuthenticateUserMiddleware, this.deleteConversation);
    }
    async getConversation(req, res) {
        try {
            const { email } = req.auth;
            const { websiteUrl } = req.body;
            if (!websiteUrl)
                return res.status(400).send('Missing websiteUrl field');
            if (!email)
                return res.status(401).send('Missing email from auth id_token');
            const conversation = await this.conversationService.getConversation({ userEmail: email, websiteUrl });
            return res.status(200).send(conversation?.conversation ?? []);
        }
        catch (err) {
            console.error(`[Server]: getConversation error - ${err}`);
            res.status(500).send(err);
        }
    }
    async deleteConversation(req, res) {
        try {
            const { email } = req.auth;
            if (!email)
                return res.status(401).send('Missing email from auth id_token');
            const { websiteUrl } = req.body;
            console.log({ websiteUrl });
            const conversation = await this.conversationService.conversationRepository.model.findOne({
                website_url: websiteUrl,
                user_email: email
            });
            if (!conversation)
                return res.status(404).send('Conversation does not exist or user cannot delete conversation');
            await this.conversationService.deleteConversation({ id: conversation.id });
            return res.end();
        }
        catch (err) {
            console.error(`[Server]: deleteConversation error - ${err}`);
            res.status(500).send(err);
        }
    }
    async addToConversation(req, res) {
        try {
            const { email } = req.auth;
            if (!email)
                return res.status(401).send('Missing email from auth id_token');
            const { websiteUrl, imageDataUrl, query } = req.body;
            if (!websiteUrl)
                throw 'Missing websiteUrl field';
            if (!query)
                throw 'Missing query field';
            const conversation = await this.conversationService.addToConversation({ userEmail: email, websiteUrl, imageDataUrl, query });
            return res.status(200).send(conversation);
        }
        catch (err) {
            console.error(`[Server]: addToConversation error - ${err}`);
            res.status(500).send(err);
        }
    }
}
