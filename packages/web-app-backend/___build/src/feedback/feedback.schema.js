import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    email: { type: String, required: true, index: true },
    message: { type: String, required: true },
    created_at: { type: String, required: true },
});
export const feedbackModel = mongoose.model('feedback', schema);
