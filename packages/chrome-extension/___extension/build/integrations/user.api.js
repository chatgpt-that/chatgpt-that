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
const getUser = (id_token) => {
    return new Promise((resolve, reject) => {
        fetch(`${BACKEND_HOST}/api/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${id_token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield response.json();
            if (data.error)
                return reject(data.error);
            resolve(data);
        }))
            .catch(() => reject('Error fetching user'));
    });
};
