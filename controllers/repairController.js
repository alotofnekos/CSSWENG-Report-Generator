const repairModel = require('../models/repairSchema.js');
const repairIdModel = require('../models/repairIdSchema.js');

function compareNumbers(a, b) {
    return a - b;
};

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
        var date = req.params.date;

        // await repairModel.find({repairDate: {$gt date}}).then(async repairDate => {

        // })
        //Find all unique repair technicians
        await repairModel.find({}).distinct('repairTechnician1').then(async repairTechnician1 => {
            // console.log(repairTechnician);
            var repairTalliedQuantities = [];

            await repairModel.find({}).distinct('repairTechnician2').then(async repairTechnician2 => {

                //Find all repairs associated with each unique repair technician
                await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2}).then(repair => {
                    var repair = repair;
                    var tempInt = 0;
                    var loopCounter = 0;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairTechnician.length)
                    // console.log("rep length = " + repair.length)

                    //Iterate over the array of unique repair technicians
                    for(i = 0; i < repairTechnician1.length; i++) {
                        //Reset temporary int
                        tempInt = 0;
                        //Iterate over the array of repairs associated with each unique repair technician
                        for(j = 0; j < repair.length; j++) {
                            //   console.log(i, j);
                            // console.log("repair tech 1", repairTechnician[i]);
                            // console.log("repair tech 2", repair[j].repairTechnician);
                            
                            //If repair technician in array of unique repair technicians == repair technician in array of repairs
                            //associated with each unique repair technician, add its repair quantity value to temporary int
                            if((repairTechnician1[i] == repair[j].repairTechnician1) || (repairTechnician1[i] == repair[j].repairTechnician2)) {
                                console.log("hatdog");
                                tempInt += repair[j].repairQuantity;
                            };
                        };
                        
                        //Store temporary int to repairTalliedQuantities
                        repairTalliedQuantities[loopCounter] = tempInt;

                        //Increment loopCounter
                        loopCounter++;
                    };

                    for(i = 0; i < repairTechnician2.length; i++) {
                        //Reset temporary int
                        tempInt = 0;
                        //Iterate over the array of repairs associated with each unique repair technician
                        for(j = 0; j < repair.length; j++) {
                            //   console.log(i, j);
                            // console.log("repair tech 1", repairTechnician[i]);
                            // console.log("repair tech 2", repair[j].repairTechnician);
                            
                            //If repair technician in array of unique repair technicians == repair technician in array of repairs
                            //associated with each unique repair technician, add its repair quantity value to temporary int
                            if((repairTechnician2[i] == repair[j].repairTechnician1) || (repairTechnician2[i] == repair[j].repairTechnician2)) {
                                console.log("hatdog");
                                tempInt += repair[j].repairQuantity;
                            };
                        };
                        
                        //Store temporary int to repairTalliedQuantities
                        repairTalliedQuantities[loopCounter] = tempInt;

                        //Increment loopCounter
                        loopCounter++;
                    };
                });
            });
            
            console.log("tallied = " + repairTalliedQuantities);
            //Send to hbs template used
            res.render('whatever hbs template to be used', {repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairTalliedQuantities: repairTalliedQuantities});
        });
    },

    //Get Total Item Quantity Per Item Model Per Technician
    getTotalItemQuantityPerItemModelPerTechnician: async function(req, res) {
        //Find all unique repair technicians
        await repairModel.find({}).distinct('repairTechnician1').then(async repairTechnician1 => {

            // console.log(repairTechnician);
            var repairTalliedQuantities = [];
            
            await repairModel.find({}).distinct('repairTechnician2').then(async repairTechnician2 => {
                //Find all unique repair item models
                await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2}).distinct('repairItemModel').then(async repairItemModel => {
                    //Find all repairs associated with each unique repair technician and each unique repair item model
                    await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairItemModel: repairItemModel}).then(repair => {
                        var loopCounter = 0;
                        var tempInt = 0;
                        // console.log("repair technicians =" + repairTechnician);
                        // console.log("repair item models =" + repairItemModel);
                        // console.log("repair = " + repair);
                        // console.log("rep tech length = " + repairTechnician.length)
                        // console.log("rep length = " + repair.length)
                        //Iterate over the array of unique repair technicians
                        for(i = 0; i < repairTechnician1.length; i++) {
                            //Reset temporary array
                            tempArray = [];
                            //Iterate over the array of unique repair item models
                            for(j = 0; j < repairItemModel.length; j++) {
                                //Reset temporary int
                                tempInt = 0;
                                //Iterate over the array of repairs associated with each unique repair technician and each unique
                                //repair item model
                                for(k = 0; k < repair.length; k++) {
                                //   console.log(i, j);
                                // console.log("repair tech 1", [i]);
                                // console.log("repair tech 2", repair[k].repairTechnician);
                                // console.log("repair item model 1", repairItemModel[j])
                                // console.log("repair item model 2", repair[k].repairItemModel);

                                    //If repair technician in array of unique repair technicians == repair technician in array of 
                                    //repairs associated with each unique repair technician and repair item model in array of unique
                                    //repair item models == repair item model in array of repairs associated with each unique repair
                                    //item model, add its repair quantity value to temporary int
                                    if((repairTechnician1[i] == repair[k].repairTechnician1 && repairItemModel[j] == repair[k].repairItemModel) ||
                                        repairTechnician1[i] == repair[k].repairTechnician2 && repairItemModel[j] == repair[k].repairItemModel) {
                                        // console.log("repair quantity =" + repair[k].repairQuantity);
                                        tempInt += repair[k].repairQuantity;
                                    };
                                };
                                //Store temporary int to tempArray
                                tempArray[j] = tempInt;
                                // console.log(tempArray);
                            };

                            //Store temporary array to repairTalliedQuantities
                            repairTalliedQuantities[loopCounter] = tempArray;

                            //Increment loopCounter
                            loopCounter++;
                        };

                        for(i = 0; i < repairTechnician2.length; i++) {
                            //Reset temporary array
                            tempArray = [];
                            //Iterate over the array of unique repair item models
                            for(j = 0; j < repairItemModel.length; j++) {
                                //Reset temporary int
                                tempInt = 0;
                                //Iterate over the array of repairs associated with each unique repair technician and each unique
                                //repair item model
                                for(k = 0; k < repair.length; k++) {
                                //   console.log(i, j);
                                // console.log("repair tech 1", [i]);
                                // console.log("repair tech 2", repair[k].repairTechnician);
                                // console.log("repair item model 1", repairItemModel[j])
                                // console.log("repair item model 2", repair[k].repairItemModel);

                                    //If repair technician in array of unique repair technicians == repair technician in array of 
                                    //repairs associated with each unique repair technician and repair item model in array of unique
                                    //repair item models == repair item model in array of repairs associated with each unique repair
                                    //item model, add its repair quantity value to temporary int
                                    if((repairTechnician2[i] == repair[k].repairTechnician1 && repairItemModel[j] == repair[k].repairItemModel) ||
                                        repairTechnician2[i] == repair[k].repairTechnician2 && repairItemModel[j] == repair[k].repairItemModel) {
                                        // console.log("repair quantity =" + repair[k].repairQuantity);
                                        tempInt += repair[k].repairQuantity;
                                    };
                                };
                                //Store temporary int to tempArray
                                tempArray[j] = tempInt;
                                // console.log(tempArray);
                            };

                            //Store temporary array to repairTalliedQuantities
                            repairTalliedQuantities[loopCounter] = tempArray;

                            //Increment loopCounter
                            loopCounter++;
                        };
                    }); 
                });
            });
            // console.log("tallied = " + repairTalliedQuantities);
            console.log(repairTalliedQuantities);
            //Send to hbs template used
            res.render('whatever hbs template to be used', {repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
        });
    },

    getAverageWorkingDaysPerTechnician: async function(req, res) {

    },

    getTotalItemQuantityPerItemModel: async function(req, res) {
        //Find all unique repair item models
        await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
            console.log(repairItemModel);
            var repairTalliedQuantities = [];
            
            //Find all repairs associated with each unique repair item model
            await repairModel.find({repairItemModel: repairItemModel}).then(repair => {
                var repair = repair;
                var tempInt = 0;
                // console.log(repair);
                console.log("rep tech length = " + repairItemModel.length)
                console.log("rep length = " + repair.length)
            
                //Iterate over the array of unique repair item models
                for(i = 0; i < repairItemModel.length; i++) {
                    //Reset temporary int
                    tempInt = 0;

                    //Iterate over the array of repairs associated with each unique repair item model
                    for(j = 0; j < repair.length; j++) {
                        //   console.log(i, j);
                        // console.log("repair tech 1", repairTechnician[i]);
                        // console.log("repair tech 2", repair[j].repairTechnician);
                        
                        //If repair item model in array of unique repair item models == repair technician in array of repairs
                        //associated with each unique repair item model, add its repair quantity value to temporary int
                        if(repairItemModel[i] == repair[j].repairItemModel) {
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
            res.render('whatever hbs template to be used', {repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
        });
    },

    getTopDefectsPerItemModel: async function(req, res) {
        //Find all unique repair item models
        await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
            console.log(repairItemModel);
            var repairTalliedQuantities = [];

            //Find all unique repair defects
            await repairModel.find({}).distinct('repairDefect').then(async repairDefect => {
                console.log(repairDefect)
                //Find all repairs associated with each unique repair item model and each unique repair defect
                await repairModel.find({repairItemModel: repairItemModel, repairDefect: repairDefect}).then(repair => {
                    var tempInt = 0;
                    var jLoopCounter = 0;
                    console.log(repair);
                    console.log("rep tech length = " + repairItemModel.length)
                    console.log("rep length = " + repair.length)
                
                    //Iterate over the array of unique repair item models
                    for(i = 0; i < repairItemModel.length; i++) {
                        //Iterate over the array of unique repair defects
                        for(j = 0; j < repairDefect.length; j++) {
                            //Reset temporary array
                            tempArray = [];
                            //Reset temporary int
                            tempInt = 0;
                            //Iterate over the array of repairs associated with each unique repair item model and each unique
                            //repair defect
                            for(k = 0; k < repair.length; k++) {
                            // console.log(i, j);
                            // console.log("repair tech 1", [i]);
                            // console.log("repair tech 2", repair[k].repairItemModel);
                            // console.log("repair item model 1", repairItemModel[j])
                            // console.log("repair item model 2", repair[k].repairItemModel);
    
                                //If repair item model in array of unique repair item models == repair item model in array of 
                                //repairs associated with each unique repair item model and repair defect in array of unique
                                //repair defects == repair defect in array of repairs associated with each unique repair
                                //defect, increment the temporary int to count its occurence
                                if(repairItemModel[i] == repair[k].repairItemModel && repairDefect[j] == repair[k].repairDefect) {
                                    // console.log("repair defect =" + repair[k].repairDefect);
                                    tempInt++;
                                };
                            };
    
                            //Store accumulated defect numbers to tempArray
                            console.log(tempArray);
                            // tempArray[0] = repairItemModel[i];
                            tempArray[0] = tempInt;
                            console.log(tempArray);
                            console.log("j = " + j);
                            //Store temporary array to repairTalliedQuantities
                            repairTalliedQuantities[jLoopCounter] = tempArray;
                            
                            //Increment loopCounter
                            jLoopCounter++;
                        };
                    };
                }); 
            })
            //Sort repairTalliedQuantities in descending order
            repairTalliedQuantities = repairTalliedQuantities.sort(compareNumbers);
            console.log("tallied = " + repairTalliedQuantities);
            //Send to hbs template used
            res.render('whatever hbs template to be used', {repairItemModel: repairItemModel, repairDefect: repairDefect, repairTalliedQuantities: repairTalliedQuantities});
        });
    },

    getPendingStatusPerItemModel: async function(req, res) {
        //Find all unique repair item models
        await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
            console.log(repairItemModel);
            var repairTalliedQuantities = [];
            
            //Find all repairs associated with each unique repair item model
            await repairModel.find({repairItemModel: repairItemModel}).then(repair => {
                var repair = repair;
                // console.log(repair);
                console.log("rep tech length = " + repairItemModel.length)
                console.log("rep length = " + repair.length)
            
                //Iterate over the array of repairs associated with each unique repair item model
                for(i = 0; i < repair.length; i++) {
                    //Store repair item model and its status to tempArray
                    tempArray = [];
                    tempArray[0] = repair[i].repairItemModel;
                    tempArray[1] = repair[i].repairItemStatus;
                    //Store temporary array to repairTalliedQuantities
                    repairTalliedQuantities[i] = tempArray;
                };
            });
            console.log("tallied = " + repairTalliedQuantities);
            //Send to hbs template used
            res.render('whatever hbs template to be used', {repairItemModel: repairItemModel, repairItemStatus: repairItemStatus, repairTalliedQuantities: repairTalliedQuantities});
        });
    }, 
};

//Export repairController to be used
module.exports = repairController;