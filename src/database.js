
const mongoose = require('mongoose');


class Connection {
    constructor() {
        try {
            (async () => {
                await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@devlinks.d9njuw1.mongodb.net/?retryWrites=true&w=majority`);
                console.log("Base de datos conectada");
            })()
        } catch (error) {
            console.log("Ocurrió un error al conectar en la base de datos");
        }
    }
}


module.exports = new Connection();