const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const repairIdSchema = new Schema({
    idCounter: {
        type: Number,
        default: 0
    },
});

const RepairId = mongoose.model('repairId', repairIdSchema);

module.exports = RepairId;