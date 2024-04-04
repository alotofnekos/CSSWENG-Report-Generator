const express = require('express');
const app = express();
const importController = require('../controllers/importController.js');
const mainController = require('../controllers/mainController.js');
const repairController = require('../controllers/repairController.js');

//Open Home
app.get('/', mainController.getMain);
//Open IQPM
app.post('/post', repairController.getTotalItemQuantityPerItemModel);
//IQPT
// app.post('/name of action or url', repairController.getTotalItemQuantityPerTechnician);

// app.post('/name of action or url', repairController.getTotalItemQuantityPerItemModelPerTechnician);
// app.post('/name of action or url', repairController.getAverageWorkingDaysPerTechnician);
// app.post('/name of action or url', repairController.getTotalItemQuantityPerItemModel);
// app.post('/name of action or url', repairController.getTopDefectsPerItemModel);
// app.post('/name of action or url', repairController.getPendingStatusPerItemModel);
//Import file and insert into DB
app.post('/importFile', importController.importFile);
// app.get('/insertRepair/:excelValues', repairController.insertRepair);
app.get('/table', repairController.getAllRepairs);

app.get('/import', mainController.getImport);

// app.get('/IQPM', mainController.generateIQPM(reportParameters));


module.exports = app;