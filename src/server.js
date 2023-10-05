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

        // The application is deployed in a domain with other application. To avoid problems with the routes, we're gonna use the prefix /devlinks/api in all our routes
        this.app.use("/devlinks/api/auth", require("/src/routes/auth.route"))
        this.app.use("/devlinks/api/user", require("/src/routes/user.route"))
        this.app.use("/devlinks/api/link", require("/src/routes/link.route"))

        this.app.use((req, res) => res.status(404).json({ "message": "Page not found" }))
    }
}


module.exports = new Server()