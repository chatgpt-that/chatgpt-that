import mongoose from 'mongoose';

export interface IFeedback {
  email: string;
  message: string;
  created_at: string;
}

const schema = new mongoose.Schema<IFeedback>({
  email: { type: String, required: true, index: true },
  message: { type: String, required: true },
  created_at: { type: String, required: true },
});

export const feedbackModel = mongoose.model('feedback', schema);
