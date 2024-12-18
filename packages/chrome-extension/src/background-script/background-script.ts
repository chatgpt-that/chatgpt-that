const ID_TOKEN_KEY_='chatgpt-that-id-token';

const getIdTokenFromStorage_ = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([ID_TOKEN_KEY_], (result) => {
      resolve(result[ID_TOKEN_KEY_] ?? '');
    });
  });
};

const setIdTokenOnStorage_ = (idToken: string): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [ID_TOKEN_KEY_]: idToken }, () => {
      resolve();
    });
  });
};

const clearIdTokenOnStorage_ = (): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.remove([ID_TOKEN_KEY_], () => {
      resolve();
    });
  });
};

const captureViewport_ = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab()
    .then((imageDataUrl) => resolve(imageDataUrl))
    .catch((err) => reject(err));
  });
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.captureViewport) {
    captureViewport_()
    .then((imageDataUrl) => sendResponse({ err: null, data: imageDataUrl }))
    .catch((err) => sendResponse({ err: err.toString(), data: null }));
  } else if (!message.access_storage) {
    sendResponse({ err: 'access_storage is false', data: null });
  } else if (message['get_id_token']) {
    getIdTokenFromStorage_()
    .then((idToken) => sendResponse({ data: idToken, err: null }))
    .catch((err) => sendResponse({ data: null, err: err.toString() }));
  } else if (message['remove_id_token']) {
    clearIdTokenOnStorage_()
    .then(() => sendResponse({ data: null, err: null }))
    .catch((err) => sendResponse({ data: null, err: err.toString() }));
  } else if (message['set_id_token'] && message['id_token']) {
    setIdTokenOnStorage_(message.id_token)
    .then(() => sendResponse({ data: null, err: null }))
    .catch((err) => sendResponse({ data: null, err: err.toString() }));
  }

  return true;
});
