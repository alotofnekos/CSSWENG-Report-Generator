const express = require('express');
const app = express();
// const morgan = require('morgan');
// const multer  = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({
//     dest: './public/uploads/',
//     limits:{
//       fileSize: 1000000
//     },
// })
// const upload = multer({ storage: storage });
const importController = require('../controllers/importController.js');
const mainController = require('../controllers/mainController.js');
const repairController = require('../controllers/repairController.js');

// app.get('/index', importController.loadIndex)
// app.get('/', importController.getFile);
app.get('/', mainController.getMain);
app.get('/IQPM', mainController.getItemQuantityPerModel);
app.get('/PTPM', mainController.getPendingTasksPerModel);
app.get('/TDPM', mainController.getTopDefectsPerModel);
// app.get('/saveFile', importController.saveFile);
app.post('/importFile', importController.importFile);
app.get('/insertRepair/:excelValues', repairController.insertRepair);
// app.post('/saveFile', upload.single('file-to-upload'), importController.logFile)
// app.post('/saveFile', upload.single('myFile'), importController.saveFile);
// app.get('/createSchema/:file', importController.uploadUserData);
// app.get('/uploadUserData/:file', importController.uploadUserData);

module.exports = app;