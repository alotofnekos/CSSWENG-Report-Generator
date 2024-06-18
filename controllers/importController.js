const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
const port = 3000
const formidable = require('formidable');
const fs = require('fs');
const repairModel = require('../models/repairSchema.js');
const repairIdModel = require('../models/repairIdSchema.js');

// //Check if a repair ID model exists and update it
// async function idExists(repairId){
//     await repairIdModel.findOneAndUpdate({
//         idCounter: repairId,
//     });
// };

// //Create neww repair model ID
// async function notIdExists(){
//     const newRepairId = new repairIdModel({});
//     await newRepairId.save();
// };

async function insertRepair(excelValues) {
    const hatdog = parseInt(excelValues[1]);
    // console.log(hatdog);
    console.log("this is the final value ", excelValues);
    const excelValuesLength = excelValues.length;
    console.log("this is json length = ", excelValuesLength);
    var repairId;
    var valuesToStore = new Object();
    var valuesToSave = new Array();

    //Check if a repair ID model exists. If yes return true, if no create a new one
    // const done = await repairIdModel.findOne({}).then(id => {
    //     console.log("awman", id);
    //     if(id == null) {
    //         notIdExists();
    //     }

    //     return true;
    // });
    
    //Iterate of the length of excel values. Starts from 1 because of an additional automatic entry and excelValuesLength - 1
    //because of another additional automatic entry
    for(i = 1; i < excelValuesLength - 1; i += 24){
        console.log('help ' + excelValues[i]);

        //If all of the inputs in a row = "NULL", do not enter into DB. Otherwise, insert into DB
        if((excelValues[i] && excelValues[i+1] && excelValues[i+2] && excelValues[i+3] && excelValues[i+4] && excelValues[i+5]
            && excelValues[i+6] && excelValues[i+7] && excelValues[i+8] && excelValues[i+9] && excelValues[i+10]
            && excelValues[i+11] && excelValues[i+12] && excelValues[i+13] && excelValues[i+14] && excelValues[i+15]
            && excelValues[i+16] && excelValues[i+17] && excelValues[i+18] && excelValues[i+19] && excelValues[i+20]
            && excelValues[i+21] && excelValues[i+22] && excelValues[i+23]) == "NULL") {
            console.log("no input");
        } else {
            //If creating or finding the repair ID model is done, find and store its idCounter value to repairId 
            // if(done) {
            //     await repairIdModel.findOne({}).then(id => {
            //         console.log("awman 2", id);
                    
            //         repairId = id.idCounter + 1;
            //         idExists(repairId)
            //     });
            // };

            // console.log("pl no = " + excelValues[i+1]);
            // console.log(parseInt(excelValues[i+1]));
            // console.log(typeof parseInt(excelValues[i+1]));
            // var repairDate = new Date(Math.round((dbNum - 25569)*86400*1000));
            // console.log("help me" + repairDate);
            //Create new repair model
            const newRepairId = new repairIdModel();
            
            await newRepairId.save();

            // const newRepair = new repairModel({
            //     repairId: newRepairId.idCounter,
            //     repairDate: parseInt(excelValues[i]),
            //     // repairDate: addDays('1900-01-01', excelValues[i]?['Date']),
            //     repairPLNumber: parseInt(excelValues[i+1]) ,//parseInt(excelValues[i+1]) 
            //     repairCustomer: excelValues[i+2],
            //     repairItemModel: excelValues[i+3],
            //     repairDescription: excelValues[i+4],
            //     repairQuantity: parseInt(excelValues[i+5]),//parseInt(excelValues[i+5])
            //     repairUOM: excelValues[i+6],
            //     repairPullOutBy: excelValues[i+7],
            //     repairCategory1: excelValues[i+8],
            //     repairCategory2: parseInt(excelValues[i+9]),
            //     repairSerialNumber: parseInt(excelValues[i+10]), //commented out because can't be null entries
            //     repairJobOrderNumber: parseInt(excelValues[i+11]), //commented out because can't be null entries
            //     repairDateStarted: parseInt(excelValues[i+12]),
            //     repairDateFinished: parseInt(excelValues[i+13]),
            //     repairTechnician1: excelValues[i+14],
            //     repairTechnician2: excelValues[i+15],
            //     repairItemStatus: excelValues[i+16],
            //     repairDeliveryStatus: excelValues[i+17],
            //     repairRemarks: excelValues[i+18],
            //     repairCost: parseInt(excelValues[i+19]), //commented out because can't be null entries
            //     repairReturnFormNumber: parseInt(excelValues[i+20]), //commented out because can't be null entries
            //     repairDateReturned: parseInt(excelValues[i+21]),
            //     repairStatus: excelValues[i+22],
            //     repairDefect: excelValues[i+23]
            // });

            const newRepair = {
                repairId: newRepairId.idCounter,
                repairDate: parseInt(excelValues[i]),
                // repairDate: addDays('1900-01-01', excelValues[i]?['Date']),
                repairPLNumber: parseInt(excelValues[i+1]) ,//parseInt(excelValues[i+1]) 
                repairCustomer: excelValues[i+2],
                repairItemModel: excelValues[i+3],
                repairDescription: excelValues[i+4],
                repairQuantity: parseInt(excelValues[i+5]),//parseInt(excelValues[i+5])
                repairUOM: excelValues[i+6],
                repairPullOutBy: excelValues[i+7],
                repairCategory1: excelValues[i+8],
                repairCategory2: parseInt(excelValues[i+9]),
                repairSerialNumber: parseInt(excelValues[i+10]), //commented out because can't be null entries
                repairJobOrderNumber: parseInt(excelValues[i+11]), //commented out because can't be null entries
                repairDateStarted: parseInt(excelValues[i+12]),
                repairDateFinished: parseInt(excelValues[i+13]),
                repairTechnician1: excelValues[i+14],
                repairTechnician2: excelValues[i+15],
                repairItemStatus: excelValues[i+16],
                repairDeliveryStatus: excelValues[i+17],
                repairRemarks: excelValues[i+18],
                repairCost: parseInt(excelValues[i+19]), //commented out because can't be null entries
                repairReturnFormNumber: parseInt(excelValues[i+20]), //commented out because can't be null entries
                repairDateReturned: parseInt(excelValues[i+21]),
                repairStatus: excelValues[i+22],
                repairDefect: excelValues[i+23]
            };

            valuesToSave.push(newRepair);
            // await newRepair.save();
        };
        
    };
    
        //Insert new repair model into DB
        await repairModel.insertMany(valuesToSave);
}

const importController = {
    //Get file from import.html and send it.
    getFile: function(req, res) {
        res.sendFile(__dirname +'/import.html');
    },

    //Import file into database
    importFile: async function(req, res) {
        console.log("post called");
        var form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            // console.log("files = " + files);
            // console.log("fields = " + fields);
            // console.log("fields data = " + fields.data);
            // base64_decode(fields.data, fields.file);


            // console.log(fields.excelValues)
            //Parse passed JSON object
            var excelValues = JSON.parse(fields.excelValues);
            insertRepair(excelValues);
        });
    }

    
};

//Export importController to be used
module.exports = importController;