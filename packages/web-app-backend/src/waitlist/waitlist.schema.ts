import mongoose from 'mongoose';

export interface IWaitList {
  email: string;
  created_at: string;
}

const schema = new mongoose.Schema<IWaitList>({
  email: { type: String, unique: true, required: true, index: true },
  created_at: { type: String, required: true },
});

export const waitListModel = mongoose.model('waitlist', schema);
