const bcrypt = require("bcrypt")
const User = require("/src/models/User");
const { response } = require("express");

class Helper {
    encryptPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync());
    }

    passwordIsValid(password) {
        return bcrypt.compare(password);
    }

    async createUser(req) {
        req.body.password = this.encryptPassword(req.body.password)
        await User.create(req.body);
    }

    returnError(message, res = response) {
        return res.status(400).json({ message })
    }
}


module.exports = new Helper()