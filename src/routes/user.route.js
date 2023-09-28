const { Router } = require("express")
const { updateProfile, getUserInformation } = require("/src/controllers/user.controller")
const { check, } = require("express-validator")
const validation = require("/src/middlewares/request.middleware")
const tokenIsValid = require("/src/middlewares/tokenIsValid.middleware")
const router = Router()
const isValidUserId = require("/src/middlewares/isValidUserId.middleware")
const { upload } = require("/src/constants")

router.post('/update', [
    tokenIsValid,
    isValidUserId,
    upload.single("avatar"), // This middleware must goes first, becuase it re makes the req.body
    check("name", "Name not found").not().isEmpty(),
    check("description", "Description not found").not().isEmpty(),
    validation,
], updateProfile)


router.get("/information", [
    isValidUserId
], getUserInformation)


module.exports = router