const {Router} = require("express");
const { register, login, logout } = require("../controllers/userControllers");

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post('/login', login);
userRoute.delete('/logout', logout);

module.exports = userRoute;