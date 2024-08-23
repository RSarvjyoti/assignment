const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    try{
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }catch(err) {
        throw new Error('Error hashing password: ' + err.message);
    }
}

const comparePassword = async (password, hashedPassword) => {
    try{
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }catch(err) {
        throw new Error('Error hashing password: ' + err.message);
    }
}

module.exports = {hashPassword, comparePassword};