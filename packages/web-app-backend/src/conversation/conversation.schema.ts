import mongoose from 'mongoose';

export interface IConversationMessage {
  identity: 'user' | 'assistant';
  message: string;
  snippet?: string;
}

export interface IConversation {
  id: string;
  user_email: string;
  website_url: string;
  conversation: IConversationMessage[];
}

const conversationMessageSchema = new mongoose.Schema<IConversationMessage>({
  identity: { type: String, required: true },
  message: { type: String, required: true },
  snippet: { type: String, required: false },
});

const schema = new mongoose.Schema<IConversation>({
  id: { type: String, unique: true, required: true, index: true },
  user_email: { type: String, required: true, index: true },
  website_url: { type: String, required: true, index: true },
  conversation: { type: [conversationMessageSchema], default: [] },
});

export const conversationModel = mongoose.model('conversation', schema);
