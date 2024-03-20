const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
const port = 3000
const formidable = require('formidable');
const fs = require('fs');

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
    try {
        fs.writeFileSync(file.toString('base64'), bitmap);
        //file written successfully
    } catch (err) {
        console.error(err)
    }

    console.log("this is jsonString:", jsonString);
    console.log("this is bitmap:", bitmap);
    console.log('******** File created from base64 encoded string ********');
};

const importController = {
    //Get file from import.html and send it.
    getFile: function(req, res) {
        // res.render('import');
        res.sendFile(__dirname +'/import.html');
    },

    //Import file into database
    importFile: async function(req, res) {
        console.log("post called");
        var form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            console.log(files);
            console.log(fields);
            //Need to pass from import.html the excel file
            base64_decode(fields.data, fields.file);
            
            //redirect to insert the repair to db from values provided by import.html
            res.redirect('/insertRepair/');
        // console.log(fields.data);

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

module.exports = importController;