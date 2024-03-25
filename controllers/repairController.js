const repairModel = require('../models/repairSchema.js');
const repairIdModel = require('../models/repairIdSchema.js');

const repairController = {
    getRepair: async function(req, res) {
        await repairModel.find({}).then(repair => {
            console.log(repair);
            res.render('table', {repair: repair});
        });
    }
};

//Export repairController to be used
module.exports = repairController;