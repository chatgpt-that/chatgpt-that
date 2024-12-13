import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    session_id: { type: String, unique: true, required: true, index: true },
    user_email: { type: String, unique: true, required: true, index: true },
    redirect_url: { type: String, required: true },
    created_at: { type: String, required: true },
});
export const stripeCheckoutSessionModel = mongoose.model('stripe-checkout-session', schema);
