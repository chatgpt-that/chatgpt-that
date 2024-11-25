import { StripeService } from '../../___integration/stripe/stripe.service.js';
import { UserService } from '../user/user.service.js';
import { CancelCheckoutSessionDTO, CompleteCheckoutSessionDTO, CreateCheckoutUrlDTO } from './payment.dto.js';

export class PaymentService {
  userService: UserService;
  stripeService: StripeService;
  creditsPerTransaction: number;
  transactionCostInCents: number;

  constructor() {
    this.createCheckoutUrl=this.createCheckoutUrl.bind(this);
    this.completeCheckoutSession=this.completeCheckoutSession.bind(this);
    this.cancelCheckoutSession=this.cancelCheckoutSession.bind(this);
    this.userService = new UserService();
    this.stripeService = new StripeService();
    this.creditsPerTransaction = 100;
    this.transactionCostInCents = 499;
  }

  async createCheckoutUrl(createCheckoutUrlDto: CreateCheckoutUrlDTO) {
    return await this.stripeService.createCheckoutUrl({
      userEmail: createCheckoutUrlDto.userEmail,
      redirectUrl: createCheckoutUrlDto.redirectUrl,
      productName: `${this.creditsPerTransaction} ChatGPT-That Credits`,
      productPriceInCents: this.transactionCostInCents,
      productQuantity: 1
    });
  }

  async completeCheckoutSession(completeCheckoutSessionDto: CompleteCheckoutSessionDTO) {
    const stripeCheckoutSession = await this.stripeService.stripeRepository.findOne({ user_email: completeCheckoutSessionDto.userEmail });
    if (!stripeCheckoutSession) throw 'Cannot find related stripe checkout session';
    const session = await this.stripeService.stripe.checkout.sessions.retrieve(stripeCheckoutSession.session_id);
    if (session.payment_status === 'unpaid') throw 'Payment not completed';
    await this.stripeService.stripeRepository.removeOne({ user_email: completeCheckoutSessionDto.userEmail });
    const user = await this.userService.userRepository.findOne({ email: completeCheckoutSessionDto.userEmail });
    if (!user) throw 'Cannot find user';
    await this.userService.userRepository.userModel.updateOne({ email: completeCheckoutSessionDto.userEmail }, { credits: user.credits + this.creditsPerTransaction });
    return stripeCheckoutSession.redirect_url;
  }

  async cancelCheckoutSession(cancelCheckoutSessionDto: CancelCheckoutSessionDTO) {
    const stripeCheckoutSession = await this.stripeService.stripeRepository.findOne({ user_email: cancelCheckoutSessionDto.userEmail });
    if (!stripeCheckoutSession) throw 'Cannot find related stripe checkout session';
    await this.stripeService.stripeRepository.removeOne({ user_email: cancelCheckoutSessionDto.userEmail });
    return stripeCheckoutSession.redirect_url;
  }

}
