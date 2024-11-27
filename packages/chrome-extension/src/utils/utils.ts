
interface IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const createElement = (
  type: string,
  styles: {[key: string]: unknown},
  id?: string,
  classes?: string[],
  innerHTML?: string,
  appendToBody?: boolean,
) => {
  const node = document.createElement(type);
  if (id) node.id = id;
  (classes??[]).forEach((classString) => node.classList.add(classString));
  for (const property in styles) (node.style as any)[property] = styles[property];
  node.innerHTML = innerHTML ?? '';
  if (appendToBody) document.body.appendChild(node);
  return node;
};

const calculateRectangle = (x1: number, x2: number, y1: number, y2: number): IRectangle => {
  const x = x1 < x2 ? x1 : x2;
  const y = y1 < y2 ? y1 : y2;
  const endX = x1 > x2 ? x1 : x2;
  const endY = y1 > y2 ? y1 : y2;
  const width = endX - x;
  const height = endY - y;
  return { x, y, width, height };
};

const decodeJwtPayload = (token: string) => {
  const [_1, payload, _3] = token.split('.');
  const payloadBase64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const payloadDecoded = atob(payloadBase64);
  return JSON.parse(payloadDecoded);
};

const getIdTokenFromStorage = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({access_storage: true, get_id_token: true}, (response) => {
      if (response.err) return reject(response.err);
      else return resolve(response.data);
    });
  });
};

const setIdTokenOnStorage = (idToken: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({access_storage: true, set_id_token: true, id_token: idToken}, (response) => {
      if (response.err) return reject(response.err);
      else return resolve(response.data);
    });
  });
};

const clearIdTokenOnStorage = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({access_storage: true, remove_id_token: true}, (response) => {
      if (response.err) return reject(response.err);
      else return resolve(response.data);
    });
  });
};

const captureViewport = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({captureViewport: true}, (response) => {
      if (response.err) return reject(response.err);
      else return resolve(response.data);
    })
  })
};

const downloadImageFromDataUrl = (imageDataUrl: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = imageDataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const createImageDataUrlFromViewport = (x: number, y: number, width: number, height: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    captureViewport()
    .then((imageDataUrl) => {
      const image = new Image();
      image.src = imageDataUrl;
      image.crossOrigin = 'Anonymous';
      image.onload = () => {
        const { naturalWidth, naturalHeight } = image;
        const scaleX = naturalWidth / window.innerWidth;
        const scaleY = naturalHeight / window.innerHeight;
        const scaledX = x * scaleX;
        const scaledY = y * scaleY;
        const scaledWidth = width * scaleX;
        const scaledHeight = height * scaleY;
        const cropWidth = Math.min(scaledWidth, naturalWidth - scaledX);
        const cropHeight = Math.min(scaledHeight, naturalHeight - scaledY);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Could not get canvas context');
        ctx.drawImage(image, scaledX, scaledY, cropWidth, cropHeight, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
      image.onerror = (error) => reject(error);
    })
    .catch(reject);
  });
};
