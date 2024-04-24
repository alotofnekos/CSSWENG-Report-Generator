const express = require('express');
const app = express();
const dbController = require('../controllers/dbController.js');
const importController = require('../controllers/importController.js');
const mainController = require('../controllers/mainController.js');
const repairController = require('../controllers/repairController.js');

//Open Login
app.get('/', mainController.login);
//Open Home
app.post('/login', mainController.getMain);
//Item Quantity Per Model
app.post('/IQPMpost', repairController.getTotalItemQuantityPerItemModel);
//Top Defects per Model
app.post('/TDPMpost', repairController.getTopDefectsPerItemModel);
//Pending Tasks per Model
app.post('/PTPMpost', repairController.getPendingStatusPerItemModel);
//Total Item Quantity Per Technician
app.post('/TIQPTpost', repairController.getTotalItemQuantityPerTechnician);
//Total item quantity per model per technician
app.post('/TIQPMPTpost', repairController.getTotalItemQuantityPerItemModelPerTechnician);
//Average working days per technician
app.post('/AWDPTpost', repairController.getAverageWorkingDaysPerTechnician);
//Update from db
app.post('/update', dbController.update);
//Delete from db
app.post('/delete', dbController.delete);
//Import file and insert into DB
app.post('/importFile', importController.importFile);
// app.get('/insertRepair/:excelValues', repairController.insertRepair);
app.get('/table', repairController.getAllRepairs);

app.get('/import', mainController.getImport);

app.get('/home', mainController.getHome);

// app.get('/IQPM', mainController.generateIQPM(reportParameters));


module.exports = app;