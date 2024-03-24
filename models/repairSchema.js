const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

//Row entry input of a repair
const repairSchema = new Schema({
    repairId: {
        type: Number,
        required: true,
        unique: true
    },
    repairDate: {
        type: String,
        required: true
    },
    repairPLNumber: {
        type: Number,
        required: true
    },
    repairCustomer: {
        type: String,
        required: true
    },
    repairItemModel: {
        type: String,
        required: true
    },
    repairDescription: {
        type: String
    },
    repairQuantity: {
        type: Number,
        required: true
    },
    repairUOM: {
        type: String
    },
    repairPullOutBy: {
        type: String,
        required: true
    },
    repairCategory: {
        type: String,
        required: true
    },
    repairSerialNumber: {
        type: Number
    },
    repairJobOrderNumber: {
        type: Number
    },
    repairDateStarted: {
        type: String,
        required: true
    },
    repairDateFinished: {
        type: String
    },
    repairTechnician: {
        type: String
    },
    repairDifficulty: {
        type: String
    },
    repairMerit: {
        type: String
    },
    repairItemStatus: {
        type: String
    },
    repairDeliveryStatus: {
        type: String
    },
    repairRemarks: {
        type: String
    },
    repairCost: {
        type: Number
    },
    repairReturnFormNumber: {
        type: Number
    },
    // repairDateReturned: {
    //     type: String
    // },
    repairDefect: {
        type: String
    }
});

const Repair = mongoose.model('repair', repairSchema);

//Export Repair model to be used
module.exports = Repair;