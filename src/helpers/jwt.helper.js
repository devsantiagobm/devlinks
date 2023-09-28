const jwt = require("jsonwebtoken")

class JWT {
    generateToken(payload = {}) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY)
    }
}

module.exports = new JWT()