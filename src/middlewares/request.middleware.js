const { request, response } = require("express")
const { validationResult } = require("express-validator")
const responseErrorAdapter = require("/src/adapters/responseError.adapter")


module.exports = function (req = request, res = response, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = responseErrorAdapter(errors.errors[0])
        return res.status(400).json(error)
    }

    next();
}