const mongoose = require('mongoose');

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

module.exports = connect;