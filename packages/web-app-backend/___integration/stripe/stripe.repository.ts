import mongoose from 'mongoose';
import { IStripeCheckoutSession, stripeCheckoutSessionModel } from './stripe.schema';
import { CreateOneDTO, FindOneDTO, RemoveOneDTO } from './stripe.dto';

export class StripeRepository {
  stripeCheckoutSessionModel: mongoose.Model<IStripeCheckoutSession>

  constructor() {
    this.findOne=this.findOne.bind(this);
    this.createOne=this.createOne.bind(this);
    this.removeOne=this.removeOne.bind(this);
    this.stripeCheckoutSessionModel = stripeCheckoutSessionModel;
  }

  async findOne(findOneDto: FindOneDTO) {
    return await this.stripeCheckoutSessionModel.findOne(findOneDto);
  }

  async createOne(createOneDto: CreateOneDTO) {
    const created_at = new Date().toISOString();
    const stripeCheckoutSession = new this.stripeCheckoutSessionModel({
      session_id: createOneDto.sessionId,
      user_email: createOneDto.userEmail,
      redirect_url: createOneDto.redirectUrl,
      created_at,
    });
    await stripeCheckoutSession.save();
    const constructedStripeCheckoutSession: IStripeCheckoutSession = {
      session_id: createOneDto.sessionId,
      user_email: createOneDto.userEmail,
      redirect_url: createOneDto.redirectUrl,
      created_at, 
    };
    return constructedStripeCheckoutSession;
  }

  async removeOne(removeOneDto: RemoveOneDTO) {
    return await this.stripeCheckoutSessionModel.deleteOne(removeOneDto);
  }

}
