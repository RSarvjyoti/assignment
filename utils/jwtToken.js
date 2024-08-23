const jwt = require("jsonwebtoken");

const generateToken = async (payload, secretKey) => {
    try {
        const token = await new Promise((resolve, reject) => {
            jwt.sign(payload, secretKey, (err, token) => {
                if (err) {
                    return reject(new Error('Error generating token: ' + err.message));
                }
                resolve(token);
            });
        });
        return token;
    } catch (err) {
        throw new Error('Error generating token: ' + err.message);
    }
}


const verifyToken = async (token, secretKey) => {
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return reject(new Error('Error verifying token: ' + err.message));
                }
                resolve(decoded);
            });
        });
        return decoded;
    } catch (err) {
        throw new Error('Error verifying token: ' + err.message);
    }
}

module.exports = {generateToken, verifyToken};