const mongoose = require('mongoose');
const repairModel = require('../models/repairSchema.js');
const repairIdModel = require('../models/repairIdSchema.js');

const repairController = {
    insertRepair: async function(req, res) {
        var repairId;

        const repairIdExists = await repairIdModel.findOne({}).then(id => {
            console.log("awman", id);
            if(id == null)
                return false;
            else {
                repairId = id.idCounter + 1;
                return true;
            }
        })

        console.log(repairIdExists);

        if(repairIdExists) {
            console.log("bruh", repairId);
            await repairIdModel.findOneAndUpdate({
                idCounter: repairId,
            })
        } else {
            console.log("in here");
            const newRepairId = new repairIdModel({});
            await newRepairId.save();
            await repairIdModel.findOne({}).then(id => {
                console.log(id);
                repairId = id.idCounter;
            })
        };

        const newRepair = new repairModel({
            repairId: repairId,
            name: tempUserName,
            seatNum: req.body.seatNum,
            timeReserved: req.body.timeReserved,
            finalTimeReserved: req.body.finalTimeReserved,
            dateReserved: req.body.dateReserved,
            labNumber: labNumber
        });
        await newRepair.save();
    }
};

module.exports = repairController;