import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    credits: { type: Number, required: true },
    created_at: { type: String, required: true },
});
export const userModel = mongoose.model('user', schema);
