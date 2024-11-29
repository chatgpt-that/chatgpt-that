import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    vote: { type: Number, required: true },
    created_at: { type: String, required: true }
});
export const featureVoteModel = mongoose.model('feature-vote', schema);
