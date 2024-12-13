import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
dotenv.config();
const auth0Domain = process.env.AUTH0_DOMAIN ?? '';
const client = jwksClient({ jwksUri: `https://${auth0Domain}/.well-known/jwks.json` });
const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        if (err)
            return callback(err);
        return callback(null, key?.getPublicKey());
    });
};
export const AuthenticateUserMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'No token provided' });
    jwt.verify(token, getKey, {
        issuer: `https://${auth0Domain}/`,
        algorithms: ['RS256']
    }, (err, decoded) => {
        if (err) {
            console.error(`[Server]: Failed to decode access_token - ${err}`);
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.auth = decoded;
        next();
    });
};
