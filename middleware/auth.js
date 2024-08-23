const tokenBlockModel = require("../models/tokenBlock");
const { verifyToken } = require("../utills/jwtToken");

require("dotenv").config();

const auth = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "Authorization header is not present" });
    }

    if (!header.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Invalid token format. Token must be in 'Bearer <token>' format." });
    }

    const token = header.split(" ")[1];

    try {

        const blockListCheck = await tokenBlockModel.findOne({ token: token });

        if (blockListCheck) {
            return res.status(403).json({ message: "This token is invalid. Please obtain a new token." });
        }


        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(400).json({ message: `Token verification failed: ${err.message}` });
    }
};

module.exports = auth;
