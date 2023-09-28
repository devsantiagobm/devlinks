const multer = require('multer')
const crypto = require("crypto")


const COOKIES_NAMES = {
    "auth_token": "auth_token",
    "user_id": "user_id"
}


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, crypto.randomUUID() + ".jpeg")
        },

    }),
    fileFilter: (req, file, cb) => {
        const whitelist = [
            'image/png',
            'image/jpeg',
            'image/jpg'
        ]

        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }

        cb(null, true)
    }
})

module.exports = { COOKIES_NAMES, upload }