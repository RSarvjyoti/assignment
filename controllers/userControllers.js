const tokenBlockModel = require("../models/tokenBlockModel");
const userModel = require("../models/userModels");

const { hashPassword, comparePassword } = require("../utils/hashpassword");
const { generateToken } = require("../utils/jwtToken");


require("dotenv").config();

const register = async (req, res) => {
    const {username, email, password,phone,profession} = req.body;
    console.log()
    try{

        const user = await userModel.findOne({email});

        if(user) {
            res.status(400).json({message : "You are already register try to login."});
        }else {
            const hashedPassword = await hashPassword(password);

            await userModel.create({username, email, password : hashedPassword, phone,profession});

            res.status(201).json({ message: "Signup successfully!" });
        }

    }catch(err) {
        res.status(500).json({message : "Internal server error..."});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "You don't have an account. Please sign up first." });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (isPasswordValid) {
            try {
                const payload = { email: user.email };
                const token = await generateToken(payload, process.env.JWT_SECRET);
                // console.log("Token => " + token);
                return res.status(200).json({ token: token });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Error generating token" });
            }
        } else {
            return res.status(400).json({ message: "Incorrect password or email" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const logout = async (req, res) => {
    try {
        const header = req.headers.authorization;

        // Check if the authorization header is present
        if (!header) {
            return res.status(400).json({ message: "Token header is not present" });
        }

        // Extract the token from the header
        const token = header.split(" ")[1];

        // Check if the token exists
        if (!token) {
            return res.status(400).json({ message: "Token is not provided" });
        }

        // Block the token by adding it to the blocklist
        await tokenBlockModel.create({ token });

        return res.status(200).json({ message: "Logout successfully!" });
    } catch (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({ message: "Internal server error..." });
    }
};


module.exports = {register, login, logout};