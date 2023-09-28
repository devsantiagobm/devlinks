const { Schema, model } = require("mongoose")


module.exports = model("user", Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, minLength: 8, required: true },
    avatar: { type: String },
    description: { type: String }
}))