const { request, response } = require("express")
const helpers = require("/src/helpers/app.helper")

function login(req = request, res = response) {
    try {
        return res.status(200).json({ "message": "Log in completed" });
    } catch (error) {
        return helpers.returnError(error.message, res)
    }
}

async function signUp(req = request, res = response) {
    try {
        await helpers.createUser(req, res)
        return res.status(200).json({ "message": "Sign up completed" });
    } catch (error) {
        return helpers.returnError(error.message, res)
    }
}


module.exports = {
    login,
    signUp
}