const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => {
        console.log("Successfully connected to do db.");
    })
    .catch((err) => {
        console.log("Error when connecting to db: " + err);
    })