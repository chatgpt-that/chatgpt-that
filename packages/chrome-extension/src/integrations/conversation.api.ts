
interface IConversationMessage {
  identity: 'user' | 'assistant';
  message: string;
  snippet?: string;
}

interface IConversation {
  id: string;
  user_email: string;
  website_url: string;
  conversation: IConversationMessage[];
}

const getConversation = (id_token: string): Promise<IConversationMessage[]> => {
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

const messageAssistant = (id_token: string, query: string, imageDataUrl?: string): Promise<IConversationMessage[]> => {
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
          imageDataUrl,
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

const deleteConversation = (id_token: string, websiteUrl: string): Promise<void> => {
  console.log('ggs');
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
          websiteUrl: websiteUrl
        })
      }
    )
    .then(async (response) => {
      if (!response.ok) return reject('');
      return resolve(undefined);
    })
    .catch(reject);
  });
};
