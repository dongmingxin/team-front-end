// import jwt from 'jsonwebtoken';

const JWT_TOKEN_NAME = 'token';

export const getToken = () => localStorage.getItem(JWT_TOKEN_NAME);

export const isLoggedIn = () => {
    const token = localStorage.getItem(JWT_TOKEN_NAME);
    if (!token) return false;
    return true

    // const decodedToken = jwt.decode(token);
    // const expirationTime = decodedToken.exp * 1000;
    // const isExpired = Date.now() - expirationTime > 0;

    // return !isExpired;
};