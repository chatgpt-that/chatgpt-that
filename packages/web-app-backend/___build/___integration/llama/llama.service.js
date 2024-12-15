export class LlamaService {
    model;
    maxTokens;
    constructor() {
        this.model = 'meta-llama/Llama-3.2-11B-Vision-Instruct';
        this.maxTokens = 500;
    }
    async continueConversation(continueConversationDto) {
        return new Promise((resolve, reject) => {
            fetch(`https://api-inference.huggingface.co/models/${this.model}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.model,
                    max_tokens: this.maxTokens,
                    stream: false,
                    messages: continueConversationDto.conversation.map((conversationMessage) => {
                        const role = conversationMessage.identity === 'user' ? 'user' : 'assistant';
                        const textContent = { type: 'text', text: conversationMessage.message };
                        const snippetContentAsList = conversationMessage.snippet ? [{ type: 'image_url', image_url: { url: conversationMessage.snippet } }] : [];
                        return {
                            role,
                            content: [textContent, ...snippetContentAsList]
                        };
                    })
                })
            })
                .then(async (response) => {
                const data = await response.json();
                resolve(data['choices'][0]['message']['content']);
            })
                .catch((err) => {
                console.error(`[Server]: Failed to continue conversation (llama) - ${err}`);
                reject('Failed to continue conversation.');
            });
        });
    }
}
