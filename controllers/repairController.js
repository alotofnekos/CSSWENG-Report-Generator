// const mongoose = require('mongoose');
// const repairModel = require('../models/repairSchema.js');
// const repairIdModel = require('../models/repairIdSchema.js');

// async function idExists(repairId){
//     await repairIdModel.findOneAndUpdate({
//         idCounter: repairId,
//     });
// };

// async function notIdExists(){
//     // var repairId;
//     const newRepairId = new repairIdModel({});
//     await newRepairId.save();
// };

// const repairController = {
//     insertRepair: async function(req, res) {
//         const excelValues = JSON.parse(req.params.excelValues);
//         const hatdog = parseInt(excelValues[1]);
//         console.log(hatdog);
//         console.log("this is the final value ", excelValues);
//         const excelValuesLength = excelValues.length;
//         console.log("this is json length = ", excelValuesLength);
//         // for(i = 0; i < )
//         var repairId;
        
//         console.log("query =" + excelValues);

//         const done = await repairIdModel.findOne({}).then(id => {
//             console.log("awman", id);
//             if(id == null) {
//                 notIdExists();
//             }

//             return true;
//         });

//         for(i = 20; i < excelValuesLength; i += 20){
//             console.log('help ' + excelValues[i]);

//             const repairDate = excelValues[i];
//             if((excelValues[i] && excelValues[i+1] && excelValues[i+2] && excelValues[i+3] && excelValues[i+4] && excelValues[i+5]
//                 && excelValues[i+6] && excelValues[i+7] && excelValues[i+8] && excelValues[i+9] && excelValues[i+10]
//                 && excelValues[i+11] && excelValues[i+12] && excelValues[i+13] && excelValues[i+14] && excelValues[i+15]
//                 && excelValues[i+16] && excelValues[i+17] && excelValues[i+18] && excelValues[i+19]) == "NULL") {
//                 console.log("no input");
//             } else {
//                 if(done) {
//                     await repairIdModel.findOne({}).then(id => {
//                         console.log("awman", id);
                        
//                         repairId = id.idCounter + 1;
//                         idExists(repairId)
//                     });
//                 };

//                 const newRepair = new repairModel({
//                     repairId: repairId,
//                     repairDate: repairDate,
//                     repairPLNumber: 1234,//parseInt(excelValues[i+1])
//                     repairCustomer: excelValues[i+2],
//                     repairItemModel: excelValues[i+3],
//                     repairDescription: excelValues[i+4],
//                     repairQuantity: 0,//parseInt(excelValues[i+5])
//                     repairPullOutBy: excelValues[i+6],
//                     repairCategory: excelValues[i+7],
//                     // repairSerialNumber: parseInt(excelValues[i+8]),
//                     // repairJobOrderNumber: parseInt(excelValues[i+9]),
//                     repairDateStarted: excelValues[i+10],
//                     repairDateFinished: excelValues[i+11],
//                     repairTechnician: excelValues[i+12],
//                     repairItemStatus: excelValues[i+13],
//                     repairDeliveryStatus: excelValues[i+14],
//                     repairRemarks: excelValues[i+15],
//                     // repairCost: parseInt(excelValues[i+16]),
//                     // repairReturnFormNumber: parseInt(excelValues[i+17]),
//                     repairDateReturned: excelValues[i+18],
//                     repairDefect: excelValues[i+19]
//                 });
//                 await newRepair.save();
//             };
//         };
//     }
// };

// //Export repairController to be used
// module.exports = repairController;