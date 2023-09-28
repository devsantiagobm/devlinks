const User = require("/src/models/User")

const { isValidObjectId } = require("mongoose")


module.exports = async function (req, res, next) {

    try {
        const id = req.headers["x-user-id"]

        if (!id) throw new Error("User Id not found")

        if (!isValidObjectId(id)) throw new Error("User Id format incorrect")

        const userInDb = await User.findById(id)

        if (!userInDb) throw new Error(`User with id ${id} not found`)

        next()

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }


}