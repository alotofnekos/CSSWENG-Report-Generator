const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const repairIdSchema = new Schema({
    idCounter: {
        type: Number,
        default: 1
    },
});

const RepairId = mongoose.model('repairId', repairIdSchema);

module.exports = RepairId;