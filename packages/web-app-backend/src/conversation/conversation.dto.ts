import { IConversationMessage } from './conversation.schema.js';

export interface FindOneDTO {
  [k: string]: string;
}

export interface CreateOneDTO {
  userEmail: string;
  websiteUrl: string;
  initialConversation?: IConversationMessage[];
}

export interface DeleteOneByIdDTO {
  id: string;
}

export interface UpdateOneByIdDTO {
  id: string;
  updates: {[k:string]: unknown};
}

export interface GetConversationDTO {
  userEmail: string;
  websiteUrl: string;
}

export interface DeleteConversationDTO {
  id: string;
}

export interface AddToConversationDTO {
  userEmail: string;
  websiteUrl: string;
  query: string;
  imageDataUrl?: string;
}
