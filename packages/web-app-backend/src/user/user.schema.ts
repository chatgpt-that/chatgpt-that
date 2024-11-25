import mongoose from 'mongoose';

export interface IUser {
  id: string;
  email: string;
  credits: number;
  created_at: string;
}

const schema = new mongoose.Schema<IUser>({
  id: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  credits: { type: Number, required: true },
  created_at: { type: String, required: true },
});

export const userModel = mongoose.model('user', schema);
