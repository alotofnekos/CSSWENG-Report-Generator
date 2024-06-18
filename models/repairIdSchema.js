const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


//Contains unique ID for each entry
const repairIdSchema = new Schema({
    idCounter: {
        type: Number
    },
});

repairIdSchema.plugin(AutoIncrement, {inc_field: 'idCounter'});

const RepairId = mongoose.model('repairId', repairIdSchema);

//Export RepairId model to be used
module.exports = RepairId;