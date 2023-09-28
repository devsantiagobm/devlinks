const bcrypt = require("bcrypt")
const User = require("/src/models/User");
const { response } = require("express");
const url = require('url');

class Helper {
    encryptPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync());
    }


    async createUser(req) {
        req.body.password = this.encryptPassword(req.body.password)
        req.body.avatar = this.getUrl(req) + "/uploads/default.jpg";
        const { password, ...user } = (await User.create(req.body))._doc;
        return user
    }

    returnError(message, res = response) {
        return res.status(400).json({ message })
    }

    getUrl(req) {
        return url.format({
            protocol: req.protocol,
            host: req.get('host')
        });
    }
}


module.exports = new Helper()