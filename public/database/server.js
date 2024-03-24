const mongoose = require('mongoose');

//Connect to Mongo DB
async function connect(){
    console.log("Connecting to MongoDB");
    return await mongoose.connect(process.env.MONGODB_URI);
}

function signalHandler() {
    console.log("Closing MongoDB connection...");
    client.close();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);

//Export connect function
module.exports = connect;