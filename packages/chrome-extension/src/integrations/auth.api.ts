
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
    const getIdTokenIFrameElement = createHiddenIFrame(`${BACKEND_HOST}/get-id-token-iframe`);
    window.addEventListener('message', (event) => {
      try {
        if (event.origin !== BACKEND_HOST) return;
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

const login = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const loginIFrameElement = createHiddenIFrame(`${BACKEND_HOST}/login-iframe`);
    window.addEventListener('message', (event) => {
      try {
        if (event.origin !== BACKEND_HOST) return;
        const { intendedForChatGPTThat, error, id_token } = JSON.parse(event.data);
        if (!intendedForChatGPTThat) return reject('Invalid message');
        if (error) return reject(error);
        return resolve(id_token);
      } catch (err) {
        return reject(err);
      } finally {
        loginIFrameElement.remove();
      }
    });
  });
};

const logout = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const logoutIFrameElement = createHiddenIFrame(`${BACKEND_HOST}/logout-iframe`);
    window.addEventListener('message', (event) => {
      try {
        if (event.origin !== BACKEND_HOST) return;
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
