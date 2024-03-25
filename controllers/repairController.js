const repairModel = require('../models/repairSchema.js');
const repairIdModel = require('../models/repairIdSchema.js');

const repairController = {
    //Get all repairs and display
    getAllRepairs: async function(req, res) {
        //Find all repairs
        await repairModel.find({}).then(repair => {
            console.log(repair);
            
            //Send to hbs template used
            res.render('table', {repair: repair});
        });
    },

    //Get Total Item Quantity Per Technician
    getTotalItemQuantityPerTechnician: async function(req, res) {
        //Find all unique repair Technicians
        await repairModel.find({}).distinct('repairTechnician').then(async repairTechnician => {
            // console.log(repairTechnician);
            var repairTalliedQuantities = [];
          
            //Find all repairs associated with each unique repair technician
            await repairModel.find({repairTechnician: repairTechnician}).then(repair => {
                var repair = repair;
                var tempInt = 0;
                // console.log(repair);
                // console.log("rep tech length = " + repairTechnician.length)
                // console.log("rep length = " + repair.length)

                //Iterate over the array of unique repair technicians
                for(i = 0; i < repairTechnician.length; i++) {
                    //Reset temporary int
                    tempInt = 0;
                    //Iterate over the array of repairs associated with each unique repair technician
                    for(j = 0; j < repair.length; j++) {
                        //   console.log(i, j);
                        // console.log("repair tech 1", repairTechnician[i]);
                        // console.log("repair tech 2", repair[j].repairTechnician);
                        
                        //If repair technician in array of unique repair technicians == repair technician in array of repairs
                        //associated with each unique repair technician, add its repair quantity value to temporary int
                        if(repairTechnician[i] == repair[j].repairTechnician) {
                            console.log("hatdog");
                            tempInt += repair[j].repairQuantity;
                        };
                    };
                    //Store temporary int to repairTalliedQuantities
                    repairTalliedQuantities[i] = tempInt;
                };
            });
            console.log("tallied = " + repairTalliedQuantities);
            //Send to hbs template used
            res.render('whatever hbs template to be used', {repairTechnician: repairTechnician, repairTalliedQuantities: repairTalliedQuantities})
        });
    },

    //Get Total Item Quantity Per Item Model Per Technician
    getTotalItemQuantityPerItemModelPerTechnician: async function(req, res) {
        await repairModel.find({}).distinct('repairTechnician').then(async repairTechnician => {
            // console.log(repairTechnician);
            var repairTalliedQuantities = [];
          
            await repairModel.find({repairTechnician: repairTechnician}).distinct('repairItemModel').then(async repairItemModel => {
                await repairModel.find({repairTechnician: repairTechnician, repairItemModel:repairItemModel}).then(repair => {
                    var tempInt = 0;
                    // console.log("repair technicians =" + repairTechnician);
                    // console.log("repair item models =" + repairItemModel);
                    // console.log("repair = " + repair);
                    // console.log("rep tech length = " + repairTechnician.length)
                    // console.log("rep length = " + repair.length)
                    for(i = 0; i < repairTechnician.length; i++) {
                    tempArray = [];
                        for(j = 0; j < repairItemModel.length; j++) {
                            tempInt = 0;
                            for(k = 0; k < repair.length; k++) {
                            //   console.log(i, j);
                            // console.log("repair tech 1", [i]);
                            // console.log("repair tech 2", repair[k].repairTechnician);
                            // console.log("repair item model 1", repairItemModel[j])
                            // console.log("repair item model 2", repair[k].repairItemModel);
                                if(repairTechnician[i] == repair[k].repairTechnician && repairItemModel[j] == repair[k].repairItemModel) {
                                    // console.log("repair quantity =" + repair[k].repairQuantity);
                                    tempInt += repair[k].repairQuantity;
                                };
                            };
                            tempArray[j] = tempInt;
                            // console.log(tempArray);
                        };
                    repairTalliedQuantities[i] = tempArray;
                    };
                }); 
            });
          
            // console.log("tallied = " + repairTalliedQuantities);
            console.log(repairTalliedQuantities);
            res.render('whatever hbs template to be used', {repairTechnician: repairTechnician, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities})
        });
    },

    getAverageWorkingDaysPerTechnician: async function(req, res) {

    },

    getTotalItemQuantityPerItemModel: async function(req, res) {

    },

    getTopDefectsRegardlessOfItemModel: async function(req, res) {

    },

    getTopDefectsPerItemModel: async function(req, res) {

    },

    getPendingStatusPerItemModel: async function(req, res) {

    }, 
};

//Export repairController to be used
module.exports = repairController;