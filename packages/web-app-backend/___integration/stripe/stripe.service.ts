import dotenv from 'dotenv';
import Stripe from 'stripe';
import { CreateCheckoutUrlDTO } from './stripe.dto';
import { StripeRepository } from './stripe.repository';

dotenv.config();

const BACKEND_HOST = process.env.BACKEND_HOST;

export class StripeService {
  stripe: Stripe;
  stripeRepository: StripeRepository;

  constructor() {
    this.createCheckoutUrl=this.createCheckoutUrl.bind(this);
    this.stripe = new Stripe(process.env.STRIPE_API_KEY ?? '');
    this.stripeRepository = new StripeRepository();
  }

  async createCheckoutUrl(createCheckoutUrlDto: CreateCheckoutUrlDTO) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${BACKEND_HOST}/api/payment/checkout/complete?user_email=${encodeURIComponent(createCheckoutUrlDto.userEmail)}`,
      cancel_url: `${BACKEND_HOST}/api/payment/checkout/cancel?user_email=${encodeURIComponent(createCheckoutUrlDto.userEmail)}`,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: createCheckoutUrlDto.productName
            },
            unit_amount: createCheckoutUrlDto.productPriceInCents
          },
          quantity: createCheckoutUrlDto.productQuantity
        }
      ]
    });

    // Remove existing session (if any) and create new session.
    try {
      const existingCheckoutSession = await this.stripeRepository.findOne({ user_email: createCheckoutUrlDto.userEmail });
      if (existingCheckoutSession) await this.stripeRepository.removeOne({ user_email: existingCheckoutSession.user_email });
    } catch (err) {
      console.error(`[Server]: Error finding and removing existing stripe checkout session - ${err}`);
    } finally {
      await this.stripeRepository.createOne({
        userEmail: createCheckoutUrlDto.userEmail,
        sessionId: session.id,
        redirectUrl: createCheckoutUrlDto.redirectUrl
      });
      return session.url;
    }
  }

}
