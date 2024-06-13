const mainController = {
    //Login feature
    login: async function(req, res) {
        res.render('login');    
    },

    //Load Home Page
    getMain: async function(req, res) {
        username = req.body.username;
        password = req.body.password;

        if(username == "Admin") { 
            if(password == 12345678) {
                res.render('home');
            } else {
                const error = "Invalid password";
                res.render('login', {error: error});
            }
        } else {
            const error = "Invalid username";
            res.render('login', {error: error});
        };
    },

    //Load Item Quantity Per Model Filter
    getItemQuantityPerModel: async function(req, res) {
        res.render('IQPM');
    },

    //Load Pending Tasks Per Model Filter
    getPendingTasksPerModel: async function(req, res) {
        res.render('PTPM');
    },

    //Load Top Defects Per Model Filter
    getTopDefectsPerModel: async function(req, res) {
        res.render('TDPM');
    },

    getImport: async function(req, res) {
        res.render('import');
    },

    getHome: async function(req, res) {
        res.render('home');
    }

};

//Export mainController to be used
module.exports = mainController;