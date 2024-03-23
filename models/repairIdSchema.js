const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

//Contains unique ID for each entry
const repairIdSchema = new Schema({
    idCounter: {
        type: Number,
        default: 0
    },
});

const RepairId = mongoose.model('repairId', repairIdSchema);

//Export RepairId model to be used
module.exports = RepairId;