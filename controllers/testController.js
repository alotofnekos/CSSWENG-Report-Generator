var phantom = require('phantom');
// var _ph, _page, _outObj;

const exportController = {
    exportFile: function(req, res) {
        phantom.create(function(error,ph){
            ph.createPage(function(err,page){
                page.open(url ,function(err,status){
                    // do something
                });
            });
        });
    }
}

module.exports = exportController;