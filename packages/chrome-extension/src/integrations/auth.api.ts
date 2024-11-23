
const createGetIdTokenIFrameElement = () => {
  return createElement(
    'div',
    {},
    undefined,
    [],
    `<iframe width="0" height="0" src="http://localhost:3000/get-id-token-iframe"/>`,
    true,
  );
};

const getIdToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const getIdTokenIFrameElement = createGetIdTokenIFrameElement();
    window.addEventListener('message', (event) => {
      try {
        if (event.origin !== 'http://localhost:3000') return;
        const { intendedForChatGPTThat, id_token } = JSON.parse(event.data);
        if (!intendedForChatGPTThat) return reject('Invalid message');
        return resolve(id_token ?? '');
      } catch (err) {
        return reject(err);
      } finally {
        getIdTokenIFrameElement.remove();
      }
    });
  });
}
