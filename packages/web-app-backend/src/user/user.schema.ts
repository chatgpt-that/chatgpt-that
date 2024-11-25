import mongoose from 'mongoose';

export interface IUser {
  email: string;
  credits: number;
  created_at: string;
}

const schema = new mongoose.Schema<IUser>({
  email: { type: String, unique: true, required: true },
  credits: { type: Number, required: true },
  created_at: { type: String, required: true },
});

export const userModel = mongoose.model('user', schema);
