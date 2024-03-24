const express = require('express');
const app = express();
const importController = require('../controllers/importController.js');
const mainController = require('../controllers/mainController.js');
const repairController = require('../controllers/repairController.js');

//Open Home
app.get('/', mainController.getMain);
//Open IQPM
app.get('/IQPM', mainController.getItemQuantityPerModel);
//Open PTPM
app.get('/PTPM', mainController.getPendingTasksPerModel);
//Open TDPM
app.get('/TDPM', mainController.getTopDefectsPerModel);
//Import file and insert into DB
app.post('/importFile', importController.importFile);
app.get('/whatever you name the action or ajax url', repairController.getRepair);
// app.get('/insertRepair/:excelValues', repairController.insertRepair);

module.exports = app;