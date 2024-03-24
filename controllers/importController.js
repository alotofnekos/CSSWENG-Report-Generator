const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
const port = 3000
const formidable = require('formidable');
const fs = require('fs');
const repairModel = require('../models/repairSchema.js');
const repairIdModel = require('../models/repairIdSchema.js');
const querystring = require('node:querystring'); 

//Check if a repair ID model exists and update it
async function idExists(repairId){
    await repairIdModel.findOneAndUpdate({
        idCounter: repairId,
    });
};

//Create neww repair model ID
async function notIdExists(){
    const newRepairId = new repairIdModel({});
    await newRepairId.save();
};

async function insertRepair(excelValues) {
    const hatdog = parseInt(excelValues[1]);
    console.log(hatdog);
    console.log("this is the final value ", excelValues);
    const excelValuesLength = excelValues.length;
    console.log("this is json length = ", excelValuesLength);
    var repairId;

    //Check if a repair ID model exists. If yes return true, if no create a new one
    const done = await repairIdModel.findOne({name: "Sean"}).then(id => {
        console.log("awman", id);
        if(id == null) {
            notIdExists();
        }

        return true;
    });

    
    //Iterate of the length of excel values. Starts from 1 because of an additional automatic entry and excelValuesLength - 1
    //because of another additional automatic entry
    for(i = 1; i < excelValuesLength - 1; i += 22){
        console.log('help ' + excelValues[i]);

        //If all of the inputs in a row = "NULL", do not enter into DB. Otherwise, insert into DB
        if((excelValues[i] && excelValues[i+1] && excelValues[i+2] && excelValues[i+3] && excelValues[i+4] && excelValues[i+5]
            && excelValues[i+6] && excelValues[i+7] && excelValues[i+8] && excelValues[i+9] && excelValues[i+10]
            && excelValues[i+11] && excelValues[i+12] && excelValues[i+13] && excelValues[i+14] && excelValues[i+15]
            && excelValues[i+16] && excelValues[i+17] && excelValues[i+18] && excelValues[i+19]) == "NULL") {
            console.log("no input");
        } else {
            //If creating or finding the repair ID model is done, find and store its idCounter value to repairId 
            if(done) {
                await repairIdModel.findOne({}).then(id => {
                    console.log("awman", id);
                    
                    repairId = id.idCounter + 1;
                    idExists(repairId)
                });
            };

            //Create new repair model
            const newRepair = new repairModel({
                repairId: repairId,
                repairDate: excelValues[i],
                repairPLNumber: 1234,//parseInt(excelValues[i+1]) 
                repairCustomer: excelValues[i+2],
                repairItemModel: excelValues[i+3],
                repairDescription: excelValues[i+4],
                repairQuantity: 0,//parseInt(excelValues[i+5])
                repairUOM: excelValues[i+6],
                repairPullOutBy: excelValues[i+7],
                repairCategory: excelValues[i+8],
                // repairSerialNumber: parseInt(excelValues[i+9]), //commented out because can't be null entries
                // repairJobOrderNumber: parseInt(excelValues[i+10]), //commented out because can't be null entries
                repairDateStarted: excelValues[i+11],
                repairDateFinished: excelValues[i+12],
                repairTechnician: excelValues[i+13],
                repairDifficulty: excelValues[i+14],
                repairMerit: excelValues[i+15],
                repairItemStatus: excelValues[i+16],
                repairDeliveryStatus: excelValues[i+17],
                repairRemarks: excelValues[i+18],
                // repairCost: parseInt(excelValues[i+19]), //commented out because can't be null entries
                // repairReturnFormNumber: parseInt(excelValues[i+20]), //commented out because can't be null entries
                // repairDateReturned: excelValues[i+21],
                repairDefect: excelValues[i+21]
            });
            //Insert new rapir model into DB
            await newRepair.save();
        };
    };
}

//Decode string with base 64
function base64_decode(base64str, file) {
    // console.log(base64str)
    console.log(file)
    // var hatdog = "hatdog"
    // var string = hatdog.toString('base64')
    base64str = base64str.toString('base64')
    var bitmap = new Buffer.from(base64str, 'base64');
    // var length = base64str.length;
    
    console.log(bitmap);
    var view = new Uint8Array(bitmap);
    
    for (var i=0; i!=base64str.length; ++i)
    {
      view[i] = base64str.charCodeAt(i) & 0xFF;
    }
    console.log(view);
    // return buf;
    // const base64Data = bitmap.toString('base64');

    // Create a JSON object with the Base64-encoded data
    const json = { data: base64str };

    // Convert the JSON object to a string
    const jsonString = JSON.stringify(json);
    // try {
    //     fs.writeFileSync(file.toString('base64'), bitmap);
    //     //file written successfully
    // } catch (err) {
    //     console.error(err)
    // }

    // console.log("this is jsonString:", jsonString);
    // console.log("this is bitmap:", bitmap);
    // console.log('******** File created from base64 encoded string ********');
};

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
            console.log("files = " + files);
            console.log("fields = " + fields);
            console.log("fields data = " + fields.data);
            base64_decode(fields.data, fields.file);

            //Parse passed JSON object
            var excelValues = JSON.parse(fields.excelValues);
            insertRepair(excelValues);
            // res.redirect('/insertRepair/' + excelValues);
            

        //   var oldpath = files.filetoupload.path;
        //   var newpath = __dirname + "/" + files.filetoupload.name;
        //   fs.rename(oldpath, newpath, function (err) {
        //     if (err) throw err;
        //     res.write('File uploaded and moved!');
        //     res.end();
        //   });
         });
    },

    // uploadUserData: async function(req, res) {
    //     try {
    //         const options = {
    //                 formData : {
    //                     'upload': String(req.file.buffer)
    //                 },
    //                 headers: {
    //                     authorization: req.token,
    //                     'Content-type': 'multipart/form-data'
    //                 },
    //                 json: true
    //         };
    //         const response = await this.http.post.exec(
    //                 '/somePostUrl/',
    //                 options
    //         );
    //         return res.status(200).json(response.body);
    //     }catch (error) {
    //         return (error);
    //     }
    //     console.log(String(req.file.buffer))
    // },

    // createSchema: function(req, res) {
    //     const file = req.params.file;
    //     console.log("2 this file is:", file);
        
    //     var obj = xlsx.parse(file); // parses a file
    //     console.log("data = ", obj);
    // },
};

//Export importController to be used
module.exports = importController;