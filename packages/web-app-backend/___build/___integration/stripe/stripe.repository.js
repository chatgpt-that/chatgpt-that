import { stripeCheckoutSessionModel } from './stripe.schema.js';
export class StripeRepository {
    stripeCheckoutSessionModel;
    constructor() {
        this.findOne = this.findOne.bind(this);
        this.createOne = this.createOne.bind(this);
        this.removeOne = this.removeOne.bind(this);
        this.stripeCheckoutSessionModel = stripeCheckoutSessionModel;
    }
    async findOne(findOneDto) {
        return await this.stripeCheckoutSessionModel.findOne(findOneDto);
    }
    async createOne(createOneDto) {
        const created_at = new Date().toISOString();
        const stripeCheckoutSession = new this.stripeCheckoutSessionModel({
            session_id: createOneDto.sessionId,
            user_email: createOneDto.userEmail,
            redirect_url: createOneDto.redirectUrl,
            created_at,
        });
        await stripeCheckoutSession.save();
        const constructedStripeCheckoutSession = {
            session_id: createOneDto.sessionId,
            user_email: createOneDto.userEmail,
            redirect_url: createOneDto.redirectUrl,
            created_at,
        };
        return constructedStripeCheckoutSession;
    }
    async removeOne(removeOneDto) {
        return await this.stripeCheckoutSessionModel.deleteOne(removeOneDto);
    }
}
