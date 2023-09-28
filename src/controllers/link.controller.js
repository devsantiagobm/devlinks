const { request, response } = require("express")
const helpers = require("/src/helpers/app.helper")
const Link = require("/src/models/Link")

async function updateLinks(req = request, res = response) {
    try {
        const links = JSON.parse(req.body.links)
        const userId = req.headers["x-user-id"] 

        await Link.findOneAndUpdate(
            { user_id: userId },
            { links },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.json({ message: "Links updated successfully" })

    } catch (error) {
        return helpers.returnError(error.message, res)
    }
}

// If db doesnt find any document with the user_id in the first argument, the db will create the document mixin the first and the second argument into one document
// Otherwise, it will be updated
// This is possible thanks to the third argument, options
// https://mongoosejs.com/docs/tutorials/findoneandupdate.html

module.exports = {
    updateLinks
}