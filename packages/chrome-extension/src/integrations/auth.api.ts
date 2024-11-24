
const createHiddenIFrame = (src: string) => {
  return createElement(
    'div',
    {},
    undefined,
    [],
    `<iframe width="0" height="0" src="${src}"/>`,
    true,
  );
};

const getIdToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const getIdTokenIFrameElement = createHiddenIFrame('http://localhost:3000/get-id-token-iframe');
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
};

const logout = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const logoutIFrameElement = createHiddenIFrame('http://localhost:3000/logout-iframe');
    window.addEventListener('message', (event) => {
      try {
        if (event.origin !== 'http://localhost:3000') return;
        const { intendedForChatGPTThat, status } = JSON.parse(event.data);
        if (!intendedForChatGPTThat) return reject('Invalid message');
        if (status !== 'completed') return reject('Unable to logout');
        return resolve();
      } catch (err) {
        return reject(err);
      } finally {
        logoutIFrameElement.remove();
      }
    });
  });
};
