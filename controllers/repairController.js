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
//workinghere
//From date to integer
//Used in frontend -> backend
function dateToInteger(givenDate, fromOrTo) {
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var parts = givenDate.split('-');
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var isLeapYear = false;

    var day= 1; 

    if (parts.length == 3){
        day = parseInt(parts[2]);
    }

    // Check for leap year
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        isLeapYear = true;
    }

    // Count the days passed in years
    var daysPassed = (year - 1900) * 365;
    // Adjust for leap years
    daysPassed += Math.floor((year - 1900 - 1) / 4) + 1;

    // Adjust for current year if leap year and past February
    if (isLeapYear && month > 2) {
        daysPassed += 1;
    }

    // Count the days passed in months
    for (var i = 0; i < month - 1; i++) {
        daysPassed += monthDays[i];
    }

    // Add the days passed in the current month
    daysPassed += day;
    console.log("days passed: "+daysPassed)

    if(fromOrTo === "to"){
        if(isLeapYear){
            if(month === 2)
                daysPassed+= 29;
        }
        daysPassed+= monthDays[month-1];
    }
    return daysPassed;
}




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
        var dateFrom = req.body.dateFrom;
        var dateTo = req.body.dateTo;
        var technician = req.body.technician

        if(technician == null) {
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
                    // console.log(repairTechnician2);
                    //Add repairTechnician2 to technician array
                    for(i = 0; i < repairTechnician2.length; i++) {
                        technician[technicianCount] = repairTechnician2[i];
                        technicianCount++;
                    }

                    //Clear all duplicate entries in technician array
                    distinctArray = clearDuplicates(technician);
                    console.log("distinct array = " + distinctArray);

                    //Find all repairs associated with each unique repair technician with repairDate greater than dateFrom and 
                    //repairDate less than dateTo parameters
                    await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                        var repair = repair;
                        var tempInt = 0;
                        // console.log(repair);
                        // console.log("rep tech length = " + repairTechnician.length)
                        // console.log("rep length = " + repair.length)
                
                        //Iterate over the array of unique repair technicians
                        for(i = 0; i < distinctArray.length; i++) {
                            //Reset temporary int
                            tempInt = 0;
                            //Iterate over the array of repairs associated with each unique repair technician
                            for(j = 0; j < repair.length; j++) {
                                //If repair technician in array of unique repair technicians == repair technician in array of 
                                //repairs associated with each unique repair technician, add its repair quantity value to 
                                //temporary int
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
        } else {
            //Find all repairs associated with the technician parameter with repairDate greater than dateFrom and repairDate 
            //less than dateTo parameters
            await repairModel.find({repairTechnician1: technician, repairTechnician2: technician, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                var repairTalliedQuantities;

                //Iterate over the array of repairs associated with each unique repair technician
                for(i = 0; i < repair.length; i++) {
                    //If repair technician in array of unique repair technicians == repair technician in array of repairs
                    //associated with each unique repair technician, add its repair quantity value to temporary int
                    if((technician == repair[i].repairTechnician1) || (technician == repair[i].repairTechnician2)) {
                        console.log("hatdog");
                        tempInt += repair[i].repairQuantity;
                    };
                };

                //Store temporary int to repairTalliedQuantities
                repairTalliedQuantities = tempInt;

                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render('whatever hbs template to be used', {repairTechnician: technician, repairTalliedQuantities: repairTalliedQuantities});
            });
        };
    },

    //Get Total Item Quantity Per Item Model Per Technician
    getTotalItemQuantityPerItemModelPerTechnician: async function(req, res) {
        var dateFrom = req.body.dateFrom;
        var dateTo = req.body.dateTo;
        var status = req.body.status;
        var itemModel = req.body.itemModel;
        var technician = req.body.technician;

        //Find all repairs associated with the required inputs taken from the request parameters with repairDate greater than 
        //dateFrom and repairDate less than dateTo parameters
        await repairModel.find({ $or:[ {repairTechnician1: technician}, {repairTechnician2: technician}], repairItemModel: itemModel, repairStatus: status, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
            // console.log(repair);
            var repairTalliedQuantities = [];
            var tempInt = 0;
            
            //Iterate over the array of repairs associated with the required inputs taken from the request parameters
            for(i = 0; i < repair.length; i++) {
                //If technician parameter == repair technician in array of repairs associated with the required inputs taken from
                //the request parameters and itemModel parameter == repair item model in array of repairs associated with the
                //required inputs taken from the request parameters, add its repair quantity value to temporary int
                if((technician == repair[i].repairTechnician1 && itemModel == repair[i].repairItemModel) ||
                technician == repair[i].repairTechnician2 && itemModel == repair[i].repairItemModel) {
                    // console.log("repair quantity =" + repair[i].repairQuantity);
                    tempInt += repair[i].repairQuantity;
                };
            };
            //Store temporary integer to repairTalliedQuantities
            repairTalliedQuantities[0] = tempInt;
            console.log("tallied = " + repairTalliedQuantities);
            //Send to hbs template used
            res.render('whatever hbs template to be used', {repairTechnician: technician, repairItemModel: itemModel, repairTalliedQuantities: repairTalliedQuantities});
        }); 
    },

    //Get Average Working Days Per Technician
    getAverageWorkingDaysPerTechnician: async function(req, res) {
        var dateFrom = req.body.dateFrom;
        var dateTo = req.body.dateTo;
        var technician = req.body.technician;

        if(technician == null) {
            //Find all unique repair technicians
            await repairModel.find({}).distinct('repairTechnician1').then(async repairTechnician1 => {
                // console.log(repairTechnician1);
                var repairAverageWorkingDays = [];
                var technician = [];
                var technicianCount = 0;

                //Add repairTechnician1 to technician array
                for(i = 0; i < repairTechnician1.length; i++) {
                    technician[technicianCount] = repairTechnician1[i];
                    technicianCount++;
                }
                
                await repairModel.find({}).distinct('repairTechnician2').then(async repairTechnician2 => {
                    // console.log(repairTechnician2);
                    //Add repairTechnician2 to technician array
                    for(i = 0; i < repairTechnician2.length; i++) {
                        technician[technicianCount] = repairTechnician2[i];
                        technicianCount++;
                    }
                
                    //Clear all duplicate entries in technician array
                    distinctArray = clearDuplicates(technician);
                    console.log("distinct array = " + distinctArray);
                
                    //Find all repairs associated with each unique repair technician with repairDate greater than dateFrom and 
                    //repairDate less than dateTo parameters
                    await repairModel.find({repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                        var repair = repair;
                        var tempInt1 = 0;
                        var tempInt2 = 0;
                        var averageWorkingDays = 0;
                        // console.log(repair);
                        // console.log("rep tech length = " + repairTechnician.length)
                        // console.log("rep length = " + repair.length)

                        //Iterate over the array of unique repair technicians
                        for(i = 0; i < distinctArray.length; i++) {
                            //Reset temporary int
                            tempInt1 = 0;
                            tempInt2 = 0;
                            //Iterate over the array of repairs associated with each unique repair technician
                            for(j = 0; j < repair.length; j++) {
                                //If repair technician in array of unique repair technicians == repair technician in array of 
                                //repairs associated with each unique repair technician, add its repair quantity value to 
                                //temporary int
                                if((distinctArray[i] == repair[j].repairTechnician1) || (distinctArray[i] == repair[j].repairTechnician2)) {
                                    // console.log(repair[j].repairDateStarted);
                                    // console.log(repair[j].repairDateFinished);
                                    tempInt1 += parseInt(repair[j].repairDateStarted);
                                    tempInt2 += parseInt(repair[j].repairDateFinished);
                                };
                            };
                            
                            // console.log("tempint 1 = " + tempInt1);
                            // console.log("tempint 2 = " + tempInt2);
                            //Average working days = summation of date finished - summation of date started
                            averageWorkingDays = tempInt2 - tempInt1;
                
                            //Store averageWorkingDays to repairAverageWorkingDays
                            repairAverageWorkingDays[i] = averageWorkingDays;
                        };
                    });
                });
                
                console.log("tallied = " + repairAverageWorkingDays);
                //Send to hbs template used
                res.render('whatever hbs template to be used', {repairTechnician1: repairTechnician1, repairTechnician2: repairTechnician2, repairAverageWorkingDays: repairAverageWorkingDays});
            });
        } else {
            //Find all repairs associated with each unique repair technician with repairDate greater than dateFrom and 
            //repairDate less than dateTo parameters
            await repairModel.find({repairTechnician1: technician, repairTechnician2: technician, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                var repairAverageWorkingDays = [];
                var tempInt1 = 0;
                var tempInt2 = 0;
                var averageWorkingDays = 0;

                //Iterate over the array of repairs associated with each unique repair technician
                for(i = 0; i < repair.length; i++) {
                    //If repair technician in array of unique repair technicians == repair technician in array of repairs
                    //associated with each unique repair technician, add its repair quantity value to temporary int
                    if((technician == repair[i].repairTechnician1) || (technician == repair[i].repairTechnician2)) {
                        // console.log(repair[j].repairDateStarted);
                        // console.log(repair[j].repairDateFinished);
                        tempInt1 += parseInt(repair[i].repairDateStarted);
                        tempInt2 += parseInt(repair[i].repairDateFinished);
                    };
                };

                //Average working days = summation of date finished - summation of date started
                averageWorkingDays = tempInt2 - tempInt1;

                //Store averageWorkingDays to repairAverageWorkingDays
                repairAverageWorkingDays = averageWorkingDays;

                console.log("tallied = " + repairAverageWorkingDays);
                //Send to hbs template used
                res.render('whatever hbs template to be used', {repairTechnician: technician, repairAverageWorkingDays: repairAverageWorkingDays});
            });
        };
    },
//workinghere
    getTotalItemQuantityPerItemModel: async function(req, res) {
        var dateFrom = dateToInteger(req.body.dateFrom, "from");
        var dateTo = dateToInteger(req.body.dateFrom, "to");
        var category1 = req.body.category1;
        console.log(req.body.sean);
        console.log(req.body);
        console.log(dateFrom +" "+ dateTo +" "+category1);
        

        if(category1 == null) {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                console.log(repairItemModel);
                var repairTalliedQuantities = [];
                
                //Find all repairs associated with each unique repair item model with repairDate greater than dateFrom and 
                //repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lte: dateTo}}).then(repair => {
                    var repair = repair;
                    var tempInt = 0;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairItemModel.length)
                    // console.log("rep length = " + repair.length)
                
                    //Iterate over the array of unique repair item models
                    for(i = 0; i < repairItemModel.length; i++) {
                        //Reset temporary int
                        tempInt = 0;

                        //Iterate over the array of repairs associated with each unique repair item model
                        for(j = 0; j < repair.length; j++) {
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
        } else {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                var repairTalliedQuantities = [];
                
                //Find all repairs associated with each unique repair item model and the category1 parameter with repairDate 
                //greater than dateFrom and repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lte: dateTo}, repairCategory1: category1}).then(repair => {
                    var repair = repair;
                    var tempInt = 0;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairItemModel.length)
                    // console.log("rep length = " + repair.length)
                
                    //Iterate over the array of unique repair item models
                    for(i = 0; i < repairItemModel.length; i++) {
                        //Reset temporary int
                        tempInt = 0;

                        //Iterate over the array of repairs associated with each unique repair item model
                        for(j = 0; j < repair.length; j++) {
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
                res.render('IQPM', {repairItemModel: repairItemModel, repairTalliedQuantities: repairTalliedQuantities});
            });
        };
    },

    getTopDefectsPerItemModel: async function(req, res) {
        var dateFrom = req.body.dateFrom;
        var dateTo = req.body.dateTo;
        var status = req.body.status;
        var itemModel = req.body.itemModel;
        var category1 = req.body.category1;
        
        if(itemModel == null) {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                var repairTalliedQuantities = [];

                //Find all unique repair defects
                await repairModel.find({}).distinct('repairDefect').then(async repairDefect => {
                    console.log(repairDefect)
                    //Find all repairs associated with each unique repair item model, each unique repair defect and the 
                    //category1 parameter with repairDate greater than dateFrom and repairDate less than dateTo parameters
                    await repairModel.find({repairItemModel: repairItemModel, repairDefect: repairDefect, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status, repairCategory1: category1}).then(repair => {
                        var tempInt = 0;
                        var jLoopCounter = 0;
                        // console.log(repair);
                        // console.log("rep tech length = " + repairItemModel.length)
                        // console.log("rep length = " + repair.length)
                    
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
                                tempArray[0] = tempInt;
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
        } else if(category1 == null) {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                var repairTalliedQuantities = [];

                //Find all unique repair defects
                await repairModel.find({}).distinct('repairDefect').then(async repairDefect => {
                    console.log(repairDefect)
                    //Find all repairs associated with the itemModel parameter and each unique repair defect with repairDate 
                    //greater than dateFrom and repairDate less than dateTo parameters
                    await repairModel.find({repairItemModel: itemModel, repairDefect: repairDefect, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status}).then(repair => {
                        var tempInt = 0;
                        var jLoopCounter = 0;
                        // console.log(repair);
                        // console.log("rep tech length = " + repairItemModel.length)
                        // console.log("rep length = " + repair.length)
                    
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
                                tempArray[0] = tempInt;
                                //Store temporary array to repairTalliedQuantities
                                repairTalliedQuantities[jLoopCounter] = tempArray;
                                
                                //Increment loopCounter
                                jLoopCounter++;
                            };
                        };
                    }); 
                });
                //Sort repairTalliedQuantities in descending order
                repairTalliedQuantities = repairTalliedQuantities.sort(compareNumbers);
                console.log("tallied = " + repairTalliedQuantities);
                //Send to hbs template used
                res.render('whatever hbs template to be used', {repairItemModel: repairItemModel, repairDefect: repairDefect, repairTalliedQuantities: repairTalliedQuantities});
            });
        };
    },

    getPendingStatusPerItemModel: async function(req, res) {
        var dateFrom = req.body.dateFrom;
        var dateTo = req.body.dateTo;
        var status = req.body.status;
        var itemModel = req.body.itemModel;
        var category1 = req.body.category1;
        
        if(itemModel == null) {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                var repairTalliedQuantities = [];
                
                //Find all repairs associated with each unique repair item model and the category1 parameter with repairDate 
                //greater than dateFrom and repairDate less than dateTo parameters
                await repairModel.find({repairItemModel: repairItemModel, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status, repairCategory1: category1}).then(repair => {
                    var repair = repair;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairItemModel.length)
                    // console.log("rep length = " + repair.length)
                
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
        } else if(category1 == null) {
            //Find all unique repair item models
            await repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
                // console.log(repairItemModel);
                var repairTalliedQuantities = [];
                
                //Find all repairs associated with the itemModel parameter with repairDate greater than dateFrom and repairDate 
                //less than dateTo parameters
                await repairModel.find({repairItemModel: itemModel, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status}).then(repair => {
                    var repair = repair;
                    // console.log(repair);
                    // console.log("rep tech length = " + repairItemModel.length)
                    // console.log("rep length = " + repair.length)
                
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
        };
    }, 
};

//Export repairController to be used
module.exports = repairController;