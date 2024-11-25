
const queryImage = (id_token: string, imageDataUrl: string, queryText: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(
      `${BACKEND_HOST}/api/chat/query`,
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
      const responsePayload = await response.text();
      if (!response.ok) return reject(responsePayload);
      return resolve(responsePayload);
    })
    .catch(reject);
  });
};
