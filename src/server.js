const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")


class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.app.listen(process.env.PORT)
    }

    middlewares() {
        this.app.use(cors({
            origin: process.env.FRONT_END_URL, credentials: true, optionSuccessStatus: 200
        }));

        this.app.use(express.json());
        this.app.use("/uploads", express.static("uploads"));
        this.app.use(cookieParser());
    }


    routes() {

        this.app.use("/auth", require("/src/routes/auth.route"))
        this.app.use("/user", require("/src/routes/user.route"))
        this.app.use("/link", require("/src/routes/link.route"))

        this.app.use((req, res) => res.status(404).json({ "message": "Page not found" }))
    }
}


module.exports = new Server()