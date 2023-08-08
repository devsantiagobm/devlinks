const express = require("express")
const cors = require("cors")



class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.app.listen(process.env.PORT)
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }


    routes() {
        this.app.use("/auth", require("/src/routes/auth.route"))
        this.app.use((req, res) => res.status(404).json({ "mensaje": "No encontrado" }))
    }
}


module.exports = new Server()