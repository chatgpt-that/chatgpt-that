
declare const html2canvas: any;

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

const createImageDataUrlFromSelectedField = (rectangle: IRectangle): Promise<string> => {
  return new Promise((resolve, reject) => {
    html2canvas(
      document.body,
      {
        x: rectangle.x + window.scrollX,
        y: rectangle.y + window.scrollY,
        width: rectangle.width,
        height: rectangle.height,
        scrollX: 0,
        scrollY: 0,
      }
    )
    .then((canvas: any) => {
      const imageDataUrl = canvas.toDataURL('image/png');
      return resolve(imageDataUrl);
    })
    .catch(reject);
  });
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
