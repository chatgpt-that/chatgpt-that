"use strict";
const createElement = (type, styles, id, classes, innerHTML, appendToBody) => {
    const node = document.createElement(type);
    if (id)
        node.id = id;
    (classes !== null && classes !== void 0 ? classes : []).forEach((classString) => node.classList.add(classString));
    for (const property in styles)
        node.style[property] = styles[property];
    node.innerHTML = innerHTML !== null && innerHTML !== void 0 ? innerHTML : '';
    if (appendToBody)
        document.body.appendChild(node);
    return node;
};
const calculateRectangle = (x1, x2, y1, y2) => {
    const x = x1 < x2 ? x1 : x2;
    const y = y1 < y2 ? y1 : y2;
    const endX = x1 > x2 ? x1 : x2;
    const endY = y1 > y2 ? y1 : y2;
    const width = endX - x;
    const height = endY - y;
    return { x, y, width, height };
};
const decodeJwtPayload = (token) => {
    const [_1, payload, _3] = token.split('.');
    const payloadBase64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const payloadDecoded = atob(payloadBase64);
    return JSON.parse(payloadDecoded);
};
const getIdTokenFromStorage = () => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ access_storage: true, get_id_token: true }, (response) => {
            if (response.err)
                return reject(response.err);
            else
                return resolve(response.data);
        });
    });
};
const setIdTokenOnStorage = (idToken) => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ access_storage: true, set_id_token: true, id_token: idToken }, (response) => {
            if (response.err)
                return reject(response.err);
            else
                return resolve(response.data);
        });
    });
};
const clearIdTokenOnStorage = () => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ access_storage: true, remove_id_token: true }, (response) => {
            if (response.err)
                return reject(response.err);
            else
                return resolve(response.data);
        });
    });
};
const captureViewport = () => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ captureViewport: true }, (response) => {
            if (response.err)
                return reject(response.err);
            else
                return resolve(response.data);
        });
    });
};
const downloadImageFromDataUrl = (imageDataUrl, fileName) => {
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const createImageDataUrlFromViewport = (x, y, width, height) => {
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
                if (!ctx)
                    return reject('Could not get canvas context');
                ctx.drawImage(image, scaledX, scaledY, cropWidth, cropHeight, 0, 0, width, height);
                resolve(canvas.toDataURL());
            };
            image.onerror = (error) => reject(error);
        })
            .catch(reject);
    });
};
