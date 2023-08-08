const { request, response } = require("express")
const User = require("/src/models/User");
const bcrypt = require("bcrypt")

module.exports = async function (req = request, res = response, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ "message": "Email not found" })
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) return res.status(400).json({ "message": "Password incorrect" })




    next()
}