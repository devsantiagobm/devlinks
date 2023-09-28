const mongoose = require("mongoose")

const { Schema, model } = mongoose

module.exports = model("link", Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    links: [{
        platform: String,
        url: String,
        username: String
    }],
}))