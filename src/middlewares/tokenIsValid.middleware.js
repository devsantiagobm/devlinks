const { request, response } = require("express")
const { verify, JsonWebTokenError } = require("jsonwebtoken")


module.exports = function (req = request, res = response, next) {

    try {
        const token = req.headers["authorization"];
        const secretKey = process.env.JWT_SECRET_KEY
        verify(token, secretKey);

        next();
        
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(400).json({ "message": "Token not valid" });
        }

        return res.status(400).json({ "message": "An unknown error just happened" });
    }


} 