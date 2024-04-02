const repairModel = require('../models/repairSchema.js');
const repairIdModel = require('../models/repairIdSchema.js');

//Returns the compared values in descending order
function compareNumbers(a, b) {
    return b - a;
};

//Clears and returns all duplicate technician entries
function clearDuplicates(technician) {
    var distinctArray = [];
    var count = 0;
   
  // Start only when a repeated value is not encountered
    var start = false;
   
    //Iterate over technician array
    for (i = 0; i < technician.length; i++) {
        //Iterate over distinct array
        for (j = 0; j < distinctArray.length; j++) {
            if (technician[i] == distinctArray[j]) {
                start = true;
            };
        };
        count++;
        //Push if no duplicates
        if (count == 1 && start == false) {
          distinctArray.push(technician[i]);
        };
        start = false;
        count = 0;
    };
   
    console.log(distinctArray);
    
    return distinctArray;
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
            console.log(repairTechnician1);
            var repairTalliedQuantities = [];
            var technician = [];
            var technicianCount = 0;
            //Add repairTechnician1 to technician array
            for(i = 0; i < repairTechnician1.length; i++) {
              technician[technicianCount] = repairTechnician1[i];
              technicianCount++;
            }
          
            await repairModel.find({}).distinct('repairTechnician2').then(async repairTechnician2 => {
                console.log(repairTechnician2);
                //Add repairTechnician2 to technician array
                for(i = 0; i < repairTechnician2.length; i++) {
                technician[technicianCount] = repairTechnician2[i];
                technicianCount++;
                }

                //Clear all duplicate entries in technician array
                distinctArray = clearDuplicates(technician);
                console.log("distinct array = " + distinctArray);

                //Find all repairs associated with each unique repair technician
                await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2}).then(repair => {
                    var repair = repair;
                    var tempInt = 0;
                    var loopCounter = 0;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairTechnician.length)
                    // console.log("rep length = " + repair.length)
            
                    //Iterate over the array of unique repair technicians
                    for(i = 0; i < distinctArray.length; i++) {
                        //Reset temporary int
                        tempInt = 0;
                        //Iterate over the array of repairs associated with each unique repair technician
                        for(j = 0; j < repair.length; j++) {
                            //   console.log(i, j);
                            // console.log("repair tech 1", repairTechnician[i]);
                            // console.log("repair tech 2", repair[j].repairTechnician);
                            
                            //If repair technician in array of unique repair technicians == repair technician in array of repairs
                            //associated with each unique repair technician, add its repair quantity value to temporary int
                            if((distinctArray[i] == repair[j].repairTechnician1) || (distinctArray[i] == repair[j].repairTechnician2)) {
                                console.log("hatdog");
                                tempInt += repair[j].repairQuantity;
                            };
                        };
                        
                        //Store temporary int to repairTalliedQuantities
                        repairTalliedQuantities[i] = tempInt;
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
            // console.log(repairTechnician1);
            var repairTalliedQuantities = [];
            var technician = [];
            var technicianCount = 0;
            //Add repairTechnician1 to technician array
            for(i = 0; i < repairTechnician1.length; i++) {
              technician[technicianCount] = repairTechnician1[i];
              technicianCount++;
            }
            
            await repairModel.find({}).distinct('repairTechnician2').then(async repairTechnician2 => {
                console.log(repairTechnician2);
                //Add repairTechnician2 to technician array
                for(i = 0; i < repairTechnician2.length; i++) {
                  technician[technicianCount] = repairTechnician2[i];
                  technicianCount++;
                }
          
                //Clear all duplicate entries in technician array
                distinctArray = clearDuplicates(technician);
                console.log("distinct array = " + distinctArray);
          
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
                        for(i = 0; i < distinctArray.length; i++) {
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
                                    if((distinctArray[i] == repair[k].repairTechnician1 && repairItemModel[j] == repair[k].repairItemModel) ||
                                    distinctArray[i] == repair[k].repairTechnician2 && repairItemModel[j] == repair[k].repairItemModel) {
                                        // console.log("repair quantity =" + repair[k].repairQuantity);
                                        tempInt += repair[k].repairQuantity;
                                    };
                                };
                                //Store temporary int to tempArray
                                tempArray[j] = tempInt;
                                // console.log(tempArray);
                            };
          
                            //Store temporary array to repairTalliedQuantities
                            repairTalliedQuantities[i] = tempArray;
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

    //Get Average Working Days Per Technician
    getAverageWorkingDaysPerTechnician: async function(req, res) {
        await //Find all unique repair technicians
        repairModel.find({}).distinct('repairTechnician1').then(async repairTechnician1 => {
          console.log(repairTechnician1);
          var repairTalliedQuantities = [];
          var technician = [];
          var technicianCount = 0;
          //Add repairTechnician1 to technician array
          for(i = 0; i < repairTechnician1.length; i++) {
            technician[technicianCount] = repairTechnician1[i];
            technicianCount++;
          }
        
            await repairModel.find({}).distinct('repairTechnician2').then(async repairTechnician2 => {
                console.log(repairTechnician2);
                //Add repairTechnician2 to technician array
                for(i = 0; i < repairTechnician2.length; i++) {
                technician[technicianCount] = repairTechnician2[i];
                technicianCount++;
                }
            
                //Clear all duplicate entries in technician array
                distinctArray = clearDuplicates(technician);
                console.log("distinct array = " + distinctArray);
            
                //Find all repairs associated with each unique repair technician
                await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2}).then(repair => {
                    var repair = repair;
                    var tempInt1 = 0;
                    var tempInt2 = 0;
                    var averageWorkingDays = 0;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairTechnician.length)
                    // console.log("rep length = " + repair.length)
            
                    //tech1, tech2, tech3, tech4
                    //Iterate over the array of unique repair technicians
                    for(i = 0; i < distinctArray.length; i++) {
                        //Reset temporary int
                        tempInt1 = 0;
                        tempInt2 = 0;
                        //Iterate over the array of repairs associated with each unique repair technician
                        for(j = 0; j < repair.length; j++) {
                            // console.log(i, j);
                            // console.log("repair tech 1", repairTechnician[i]);
                            // console.log("repair tech 2", repair[j].repairTechnician);
                            
                            //If repair technician in array of unique repair technicians == repair technician in array of repairs
                            //associated with each unique repair technician, add its repair quantity value to temporary int
                            if((distinctArray[i] == repair[j].repairTechnician1) || (distinctArray[i] == repair[j].repairTechnician2)) {
                                // console.log("hatdog");
                                // console.log(repair[j].repairDateStarted);
                                // console.log(repair[j].repairDateFinished);
                                tempInt1 += parseInt(repair[j].repairDateStarted);
                                tempInt2 += parseInt(repair[j].repairDateFinished);
                            };
                        };
                        
                        // console.log("tempint 1 = " + tempInt1);
                        // console.log("tempint 2 = " + tempInt2);
                        //Average working days = summation of date finished - sumamtion of date started
                        averageWorkingDays = tempInt2 - tempInt1;
            
                        //Store averageWorkingDays to repairTalliedQuantities
                        repairTalliedQuantities[i] = averageWorkingDays;
                    };
                });
            });
          
          console.log("tallied = " + repairTalliedQuantities);
          //Send to hbs template used
          res.render('whatever hbs template to be used', {repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairTalliedQuantities: repairTalliedQuantities});
        });
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