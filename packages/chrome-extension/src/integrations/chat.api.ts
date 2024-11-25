
const queryImage = (id_token: string, imageDataUrl: string, queryText: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(
      'http://localhost:3000/api/chat/query',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${id_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queryText,
          imageDataUrl,
        })
      }
    )
    .then(async (response) => {
      const data = await response.text();
      resolve(data);
    })
    .catch(() => reject('Failed to query'));
  });
};
