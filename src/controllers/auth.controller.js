const { request, response } = require("express")
const helpers = require("/src/helpers/app.helper")
const jwtHelpers = require("/src/helpers/jwt.helper")
const authHelpers = require("/src/helpers/auth.helper")


async function login(req = request, res = response) {
    try {
        req.user = await authHelpers.userExists(req, res);
        const token = jwtHelpers.generateToken({ user: req.user });
        return res.status(200).json({ "message": "Log in completed", token, userID: req.user._id.valueOf() });
    } catch (error) {
        return helpers.returnError(error.message, res)
    }
}

async function signUp(req = request, res = response) {
    try {
        req.user = await helpers.createUser(req, res);
        const token = jwtHelpers.generateToken({ user: req.user });
        return res.status(200).json({ "message": "Sign up completed", token, userID: req.user._id.valueOf()  });
    } catch (error) {
        return helpers.returnError(error.message, res)
    }
}

async function token(req = request, res = response) {
    try {
        return res.json({ "message": "Token is ok" })
    } catch (error) {
        return helpers.returnError(error.message, res);
    }
}


module.exports = {
    login,
    signUp,
    token
}