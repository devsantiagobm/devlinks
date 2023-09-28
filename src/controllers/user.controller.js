const { response, request } = require("express")
const User = require("/src/models/User")
const Link = require("/src/models/Link")
const Helpers = require("/src/helpers/app.helper")

async function updateProfile(req = request, res = response) {
    try {
        const userId = req.headers["x-user-id"]
        const { name, description } = req.body

        // Mongo doesnt allow undefined values, so if the file doesnt come, it means it isnt being updated, so it doesnt have to change

        const avatar = req?.file?.filename ? Helpers.getUrl(req) + "/uploads/" + req?.file?.filename : undefined

        await User.findByIdAndUpdate(userId, { name, description, avatar })
        return res.json({ "message": "Profile updated correctly" })
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}


async function getUserInformation(req, res) {

    try {
        const userId = req.headers["x-user-id"]
        const { password, ...profile } = (await User.findById(userId))._doc
        const unformatedLinks = (await Link.findOne({ user_id: userId }))?._doc ?? { links: [] }

        const links = unformatedLinks.links.map(({ platform, url, username, _id }) => {
            return {
                platform, url, username,
                id: _id
            }
        })

        return res.json({ profile, links })
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

module.exports = {
    updateProfile,
    getUserInformation
}