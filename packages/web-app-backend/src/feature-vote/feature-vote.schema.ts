import mongoose from 'mongoose';

export interface IFeatureVote {
  email: string;
  vote: 1 | 2 | 3;
  created_at: string;
}

const schema = new mongoose.Schema<IFeatureVote>({
  email: { type: String, required: true, unique: true, index: true },
  vote: { type: Number, required: true },
  created_at: { type: String, required: true }
});

export const featureVoteModel = mongoose.model('feature-vote', schema);
