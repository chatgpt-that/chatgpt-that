import mongoose from 'mongoose';

export interface IStripeCheckoutSession {
  session_id: string;
  user_email: string;
  redirect_url: string;
  created_at: string;
}

const schema = new mongoose.Schema<IStripeCheckoutSession>({
  session_id: { type: String, unique: true, required: true, index: true },
  user_email: { type: String, unique: true, required: true, index: true },
  redirect_url: { type: String, required: true },
  created_at: { type: String, required: true },
});

export const stripeCheckoutSessionModel = mongoose.model('stripe-checkout-session', schema);
