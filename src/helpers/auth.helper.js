const User = require("/src/models/User")
const bcrypt = require("bcrypt")

class AuthHelper {
    async userExists(req = request, res = response) {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) throw new Error("Email not found" )

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) throw new Error("Password incorrect")


        const { password: passwordDeleted, ...restOfUser } = user._doc
        return restOfUser
    }
}

module.exports = new AuthHelper()