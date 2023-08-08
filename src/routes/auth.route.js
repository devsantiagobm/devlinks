const { Router } = require("express")
const { check } = require("express-validator")
const validation = require("/src/middlewares/request.middleware")
const authControllers = require("/src/controllers/auth.controller")
const isNewUser = require("/src/middlewares/isNewUser.middleware")
const userExists = require("/src/middlewares/userExists.middleware")



const router = Router()

router.post("/login", [
    check("email", "Email not found").not().isEmpty(),
    check("email", "This is not an email").isEmail(),

    check("password", "Password not found").not().isEmpty(),
    check("password", "Password must have a minimum of 8 letters and a maximum of 20 characters").isLength({ min: 8, max: 20 }),
    validation,
    userExists
], authControllers.login);


router.post("/signup", [
    check("email", "Email not found").not().isEmpty(),
    check("email", "This is not an email").isEmail(),

    check("password", "Password not found").not().isEmpty(),
    check("password", "Password must have a minimum of 8 letters and a maximum of 20 characters").isLength({ min: 8, max: 20 }),
    validation,
    isNewUser
], authControllers.signUp);



module.exports = router