const repairModel = require('../models/repairSchema.js');

const dbController = {
    update: async function(req, res) {
        const repairId = req.body.repairId;
        const repairDate = req.body.repairDate;
        const repairPLNumber = req.body.repairPLNumber;
        const repairCustomer = req.body.repairCustomer;
        const repairItemModel = req.body.repairItemModel;
        const repairDescription = req.body.repairDescription;
        const repairQuantity = req.body.repairQuantity;
        const repairUOM = req.body.repairUOM;
        const repairPullOutBy = req.body.repairPullOutBy;
        const repairCategory1 = req.body.repairCategory1;
        const repairCategory2 = req.body.repairCategory2;
        const repairSerialNumber = req.body.repairSerialNumber;
        const repairJobOrderNumber = req.body.repairJobOrderNumber;
        const repairDateStarted = req.body.repairDateStarted;
        const repairDateFinished = req.body.repairDateFinished;
        const repairTechnician1 = req.body.repairTechnician1;
        const repairTechnician2 = req.body.repairTechnician2;
        const repairItemStatus = req.body.repairItemStatus;
        const repairDeliveryStatus = req.body.repairDeliveryStatus;
        const repairRemarks = req.body.repairRemarks;
        const repairCost = req.body.repairCost;
        const repairReturnFormNumber = req.body.repairReturnFormNumber;
        const repairDateReturned = req.body.repairDateReturned;
        const repairStatus = req.body.repairStatus;
        const repairDefect = req.body.repairDefect;

        console.log(repairId);
        console.log(repairDate);
        console.log(repairPLNumber);
        console.log(repairCustomer);
        console.log(repairItemModel);
        console.log(repairDescription);
        console.log(repairQuantity);
        console.log(repairUOM);
        console.log(repairPullOutBy);
        console.log(repairCategory1);
        console.log(repairCategory2);
        console.log(repairSerialNumber);
        console.log(repairJobOrderNumber);
        console.log(repairDateStarted);
        console.log(repairDateFinished);
        console.log(repairTechnician1);
        console.log(repairTechnician2);
        console.log(repairItemStatus);
        console.log(repairDeliveryStatus);
        console.log(repairRemarks);
        console.log(repairCost);
        console.log(repairReturnFormNumber);
        console.log(repairDateReturned);
        console.log(repairStatus);
        console.log(repairDefect);

        await repairModel.findOneAndUpdate({repairId: repairId}, {
            repairDate: repairDate,
            repairPLNumber: repairPLNumber,
            repairCustomer: repairCustomer,
            repairItemModel: repairItemModel,
            repairDescription: repairDescription,
            repairQuantity: repairQuantity,
            repairUOM: repairUOM,
            repairPullOutBy: repairPullOutBy,
            repairCategory1: repairCategory1,
            repairCategory2: repairCategory2,
            repairSerialNumber: repairSerialNumber,
            repairJobOrderNumber: repairJobOrderNumber,
            repairDateStarted: repairDateStarted,
            repairDateFinished: repairDateFinished,
            repairTechnician1: repairTechnician1,
            repairTechnician2: repairTechnician2,
            repairItemStatus: repairItemStatus,
            repairDeliveryStatus: repairDeliveryStatus,
            repairRemarks: repairRemarks,
            repairCost: repairCost,
            repairReturnFormNumber: repairReturnFormNumber,
            repairDateReturned: repairDateReturned,
            repairStatus: repairStatus,
            repairDefect: repairDefect
        }).then(repair => {
            console.log(repair);
        }).catch(error => {
            console.log("update error: " + error);
        });

        res.redirect(`/table`);
    },
    
    //Import file into database
    delete: async function(req, res) {
        const repairId = req.body.repairId;

        console.log(repairId);

        await repairModel.deleteOne({repairId: repairId}).then(repair => {
            console.log(repair)
        }).catch(error => {
            console.log("delete error: " + error);
        });
         
        res.redirect(`/table`);
    },

    deleteAll: async function(req, res) {
        await repairModel.deleteAll().then(repair => {
            console.log("this is repair: ");
            console.log(repair);
        }).catch(error => {
            console.log("delete error: " + error);
        });

        res.redirect(`/table`);
    }
};

//Export dbController to be used
module.exports = dbController;