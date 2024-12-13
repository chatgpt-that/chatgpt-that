import mongoose from 'mongoose';
const conversationMessageSchema = new mongoose.Schema({
    identity: { type: String, required: true },
    message: { type: String, required: true },
    snippet: { type: String, required: false },
});
const schema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, index: true },
    user_email: { type: String, required: true, index: true },
    website_url: { type: String, required: true, index: true },
    conversation: { type: [conversationMessageSchema], default: [] },
});
export const conversationModel = mongoose.model('conversation', schema);
