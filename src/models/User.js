const { Schema, model } = require("mongoose")


const UserSchema = {
    username: { type: String, minLength: 8, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minLength: 8, required: true },
    avatar: { type: String }
}


module.exports = model("user", UserSchema)