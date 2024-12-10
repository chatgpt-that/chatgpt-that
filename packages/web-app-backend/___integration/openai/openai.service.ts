import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class OpenAiService {
  model: string;
  openai: OpenAI;
  maxTokens: number;
  
  constructor() {
    this.queryImage=this.queryImage.bind(this);
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
}
