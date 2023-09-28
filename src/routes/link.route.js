const { Router } = require("express")
const controller = require("/src/controllers/link.controller")
const { check } = require("express-validator")
const validation = require("/src/middlewares/request.middleware")
const tokenIsValid = require("/src/middlewares/tokenIsValid.middleware")
const router = Router()
const isValidUserId = require("/src/middlewares/isValidUserId.middleware")


router.post("/update", [
    tokenIsValid,
    isValidUserId,
    check("links", "Links not found").not().isEmpty(),
    validation
], controller.updateLinks)

module.exports = router