import cors from 'cors';
import { PaymentService } from './payment.service.js';
import { AuthenticateUserMiddleware } from '../../___middlewares/authenticate-user.js';
export class PaymentController {
    app;
    paymentService;
    constructor(app) {
        this.createCheckoutUrl = this.createCheckoutUrl.bind(this);
        this.completeCheckoutSession = this.completeCheckoutSession.bind(this);
        this.cancelCheckoutSession = this.cancelCheckoutSession.bind(this);
        this.paymentService = new PaymentService();
        this.app = app;
        console.log('[Server]: API Available - POST /api/payment/checkout');
        console.log('[Server]: API Available - GET /api/payment/checkout/complete');
        console.log('[Server]: API Available - GET /api/payment/checkout/cancel');
        this.app.options('/api/payment/checkout', cors({ origin: '*' }));
        this.app.post('/api/payment/checkout', cors({ origin: '*' }), AuthenticateUserMiddleware, this.createCheckoutUrl);
        this.app.get('/api/payment/checkout/complete', this.completeCheckoutSession);
        this.app.get('/api/payment/checkout/cancel', this.cancelCheckoutSession);
    }
    async createCheckoutUrl(req, res) {
        try {
            const { redirectUrl } = req.body;
            if (!redirectUrl)
                return res.status(400).send('Missing redirectUrl field');
            const { email } = req.auth;
            if (!email)
                return res.status(401).send('Missing email from auth id_token');
            const checkoutUrl = await this.paymentService.createCheckoutUrl({
                userEmail: email,
                redirectUrl,
            });
            return res.status(200).send(checkoutUrl);
        }
        catch (err) {
            console.error(`[Server]: Failed to create checkout url - ${err}`);
            return res.status(500).send('The server ran into an issue, please refresh and try again');
        }
    }
    async completeCheckoutSession(req, res) {
        try {
            const userEmail = decodeURIComponent(req.query?.user_email ?? '');
            if (!userEmail)
                return res.status(400).send('Missing user_email in the url query');
            const redirectUrl = await this.paymentService.completeCheckoutSession({ userEmail });
            return res.redirect(redirectUrl);
        }
        catch (err) {
            console.error(`[Server]: Failed to complete checkout - ${err}`);
            return res.status(500).send('The server ran into an issue, please refresh and try again');
        }
    }
    async cancelCheckoutSession(req, res) {
        try {
            const userEmail = decodeURIComponent(req.query?.user_email ?? '');
            if (!userEmail)
                return res.status(400).send('Missing user_email in the url query');
            const redirectUrl = await this.paymentService.cancelCheckoutSession({ userEmail });
            return res.redirect(redirectUrl);
        }
        catch (err) {
            console.error(`[Server]: Failed to cancel checkout - ${err}`);
            return res.status(500).send('The server ran into an issue, please refresh and try again');
        }
    }
}
