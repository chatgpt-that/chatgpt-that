
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

const getConversation = (id_token: string): Promise<IConversation[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_HOST}/api/conversation/retrieve`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${id_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteUrl: window.location.origin
        })
      }
    )
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) return reject(data);
      return resolve(data);
    })
    .catch(reject);
  });
};

const messageAssistant = (id_token: string, query: string, imageDataUrl?: string): Promise<IConversation[]> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_HOST}/api/conversation/message`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${id_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          websiteUrl: window.location.origin
        })
      }
    )
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) return reject(data);
      return resolve(data);
    })
    .catch(reject);
  });
};

const deleteConversation = (id_token: string, conversationId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_HOST}/api/conversation`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${id_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
        })
      }
    )
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) return reject(data);
      return resolve(data);
    })
    .catch(reject);
  });
};
