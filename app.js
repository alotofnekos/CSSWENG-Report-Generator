// const xl = require('excel4node');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require(`body-parser`);
const routes = require('./routes/routes.js');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const connect = require('./public/database/server.js');
// const { app, protocol, BrowserWindow, ipcMain } = require('electron');
// const axios = require('axios');
const appExp = express();
const path = require('path');
// const url = require('url');
// const fs = require('fs');
// const os = require('os');
const http = require("http");
const repairModel = require('./models/repairSchema.js');

//Just checking max size of header that can be sent
let size = http.maxHeaderSize;
console.log('Max HTTP Header size is', size);
dotenv.config();

//Set hbs as view engine
appExp.set(`view engine`, `hbs`);
appExp.set('views', path.join(__dirname, 'views'));
// hbs.registerPartials(__dirname + `/views/partials`)

appExp.use(bodyParser.json())
appExp.use(bodyParser.urlencoded( {extended: true } ))
//Set static directory
appExp.use(express.static(__dirname + '/public'));
//User a router for controllers
appExp.use(`/`, routes);

//Include date parameter in all repair controller functions except get all
//Include task type parameter or 'status' TIQPIMPT and PSPM and TDPM repair controller function
//Include if for technician empty, item model empty, and category empty
function compareNumbers(a, b) {
  return b.repairDefectQuantity - a.repairDefectQuantity;
};

var dateFrom = 45391;
var dateTo = 45600;

var category1 = "ACCESSORIES";

// var dateFromString = new Date(Math.round((dateFrom - 25569)*86400*1000));
// var dateToString = new Date(Math.round((dateTo - 25569)*86400*1000));
// console.log("date from: " + dateFromString);
// console.log("date to: "+ dateToString);

var status = "Repair";
var itemModel = "default";
// var category1 = req.body.category1;

// console.log(req.body);

if(itemModel == "default") {
    //Find all unique repair item models
    repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
        console.log(repairItemModel);
        var repairTalliedQuantities = [];

        //Find all unique repair defects
        await repairModel.find({}).distinct('repairDefect').then(async repairDefect => {
            console.log(repairDefect)
            //Find all repairs associated with each unique repair item model, each unique repair defect and the 
            //category1 parameter with repairDate greater than dateFrom and repairDate less than dateTo parameters
            await repairModel.find({repairItemModel: repairItemModel, repairDefect: repairDefect, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status, repairCategory1: category1}).then(repair => {
                var tempArray = {};
                var tempArray2 = [];
                var tempInt = 0;
                var jLoopCounter = 0;
                console.log(repair);
                // console.log("rep tech length = " + repairItemModel.length)
                // console.log("rep length = " + repair.length)
            
                //Iterate over the array of unique repair item models
                for(i = 0; i < repairItemModel.length; i++) {
                    //Reset temporary array 2
                    tempArray2 = [];
                    //Iterate over the array of unique repair defects
                    for(j = 0; j < repairDefect.length; j++) {
                        //Reset temporary array
                        tempArray = {};
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

                        //Store repairDefect[j] to repairDefect key
                        tempArray.repairDefect = repairDefect[j];
                        //Store accumulated quantity to repairDefectQuantity key
                        tempArray.repairDefectQuantity = tempInt;
                        // console.log(tempArray)
                        //Store temporary array to temporary array 2
                        tempArray2[jLoopCounter] = tempArray;
                        // console.log(tempArray2)
                        //Increment loopCounter
                        jLoopCounter++;
                    };
                    //Store temporary array 2 to repairTalliedQuantities
                    repairTalliedQuantities[i] = tempArray2
                };
            }); 
        })
        //Iterate over the repair item models and Sort repairTalliedQuantities in descending order
        for(i = 0; i < repairItemModel.length; i++) { 
          repairTalliedQuantities[i] = repairTalliedQuantities[i].sort(compareNumbers);
        }
        console.log("tallied = " + JSON.stringify(repairTalliedQuantities));
        //Send to hbs template used
        res.render('TDPM', {repairItemModel: repairItemModel, repairDefect: repairDefect, repairTalliedQuantities: JSON.stringify(repairTalliedQuantities)});
    });
} else if(category1 == "default") {
    //Find all unique repair item models
    repairModel.find({}).distinct('repairItemModel').then(async repairItemModel => {
        // console.log(repairItemModel);
        var repairTalliedQuantities = [];

        //Find all unique repair defects
        await repairModel.find({}).distinct('repairDefect').then(async repairDefect => {
            console.log(repairDefect)
            //Find all repairs associated with the itemModel parameter and each unique repair defect with repairDate 
            //greater than dateFrom and repairDate less than dateTo parameters
            await repairModel.find({repairItemModel: itemModel, repairDefect: repairDefect, repairDate: {$gte: dateFrom, $lte: dateTo}, repairStatus: status}).then(repair => {
                var tempArray = {};
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
                        tempArray = {};
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

                        //Store repairDefect[j] to repairDefect key
                        tempArray.repairDefect = repairDefect[j];
                        //Store accumulated quantity to repairDefectQuantity key
                        tempArray.repairDefectQuantity = tempInt;
                        // console.log(tempArray)

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
        console.log("tallied = " + JSON.stringify(repairTalliedQuantities));
        //Send to hbs template used
        res.render('TDPM', {repairItemModel: repairItemModel, repairDefect: repairDefect, repairTalliedQuantities: JSON.stringity(repairTalliedQuantities)});
    });
};


//Run on Local Host and connect to Mongo DB
appExp.listen(process.env.SERVER_PORT, async function(){
  console.log("Running on port: " + process.env.SERVER_PORT);
  try{
      await connect();
      console.log("connected to database!");
  }catch(err){
      console.error(err);
      console.log("Failed to connect to database");
  }
});