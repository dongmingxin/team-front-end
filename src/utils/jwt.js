const jwt = require('jsonwebtoken');

const secret = 'jr-pizza-secret-key';

function generateToken(id) {
    const token = jwt.sign( { id }, secret, { expiresIn: '1d'});
    return token;
}

function validateToken(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        return null;
    }
    return decoded
}

module.exports = {
    generateToken,
    validateToken
}