"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const queryImage = (id_token, imageDataUrl, queryText) => {
    return new Promise((resolve, reject) => {
        fetch(`${BACKEND_HOST}/api/chat/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${id_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                queryText,
                imageDataUrl,
            })
        })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const responsePayload = yield response.text();
            if (!response.ok)
                return reject(responsePayload);
            return resolve(responsePayload);
        }))
            .catch(reject);
    });
};
