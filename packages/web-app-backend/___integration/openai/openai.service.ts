import OpenAI from 'openai';
import dotenv from 'dotenv';
import { IConversationMessage } from '../../src/conversation/conversation.schema.js';

dotenv.config();

export class OpenAiService {
  model: string;
  openai: OpenAI;
  maxTokens: number;
  
  constructor() {
    this.queryImage=this.queryImage.bind(this);
    this.continueConversation=this.continueConversation.bind(this);
    this.model = 'chatgpt-4o-latest';
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.maxTokens = 300;
  }

  async queryImage(imageUrl: string, queryText: string) {
    const result = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: queryText,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      max_tokens: this.maxTokens,
    });
    console.log(`[Server]: OpenAI Response - \n${JSON.stringify(result, null, 2)}`);
    return result?.choices?.[0]?.message?.content ?? 'No response found.';
  }

  async continueConversation(conversation: IConversationMessage[]) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: conversation.map(({ identity, snippet, message }) => {
        const role: any = identity;
        const textContent: { type: 'text', text: string } = { type: 'text', text: message };
        const imageContentAsList: { type: 'image_url', image_url: { url: string } }[] = snippet ? [{ type: 'image_url', image_url: { url: snippet } }] : [];
        return { role, content: [textContent, ...imageContentAsList] };
      }),
      max_tokens: this.maxTokens
    });
    console.log(`[Server]: OpenAI Response - \n${JSON.stringify(response, null, 2)}`);
    return response?.choices?.[0]?.message?.content ?? 'No response found.';
  }
}
