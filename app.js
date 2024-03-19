const xl = require('excel4node');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require(`body-parser`);
const routes = require('./routes/routes.js');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const connect = require('./public/database/server.js');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
// const multer  = require('multer')
// const { app, protocol, BrowserWindow, ipcMain } = require('electron');
// const axios = require('axios');
const appExp = express();
const path = require('path');
// const url = require('url');
// const fs = require('fs');
// const os = require('os');

dotenv.config();
appExp.use(morgan('dev'));
// let mainWindow

appExp.set(`view engine`, `hbs`);
// hbs.registerPartials(__dirname + '/views/partials')
// hbs.registerPartials(__dirname + `/views/partials`)

appExp.use(bodyParser.json())
appExp.use(bodyParser.urlencoded( {extended: true } ))
appExp.use(express.static(`./public`));
appExp.use(`/`, routes);

// var excelStorage = multer.diskStorage({  
//   destination:(req,file,cb)=>{  
//        cb(null,'./public/excelUploads');      // file added to the public folder of the root directory
//   },  
//   filename:(req,file,cb)=>{  
//        cb(null,file.originalname);  
//   }  
// });  
// var excelUploads = multer({storage:excelStorage}); 

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