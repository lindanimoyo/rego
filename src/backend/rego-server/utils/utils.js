/**
 * The file contains helper functions to the resolvers
 *
 * */

import jwt from 'jsonwebtoken'

// create an app secret
const APP_SECRET = "ACSCENDE-SUPERIUS"

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }

    throw new Error('Not authenticated');
}

export {
    getUserId,
    APP_SECRET
}
