const User = require("/src/models/User")


module.exports = async function (req, res, next) {
    const { email } = req.body
    const user = await User.findOne({ email })
    
    if(user){
        return res.status(400).json({message: "Email is already in use"})
    }

    next()
}