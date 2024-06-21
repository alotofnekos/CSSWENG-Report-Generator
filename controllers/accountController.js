const userModel = require('../models/userSchema.js');

const accountController = {
    createAccount: async function(req, res) {
        const userType = req.body.userType;
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        
        try {
            const newUser = new userModel ({
                userId: this.userId,
                userType: userType,
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword
            });
        } catch(error) {
            console.log(error);
        }

        await newUser.save().then(newUser => {
            console.log(newUser);
        }).catch(error => {
            console.log("Account creation error: " + error);
        });
    },

    updateAccount: async function(req, res) {
        const userId = req.body.userId;
        const userType = req.body.userType;
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;

        await userModel.findOneAndUpdate({userId: userId}, {
            userType: userType,
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        }).then(user => {
            console.log(user);
        }).catch(error => {
            console.log("Account update error: " + error);
        });

        // res.redirect('ProfilePage');
    },

    deleteAccount: async function(req, res) {
        const userId = req.body.userId;
        const userType = req.body.userType;
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;

        await userModel.findOneAndDelete({userId: userId}).then(user => {
            console.log(user);
        }).catch(error => {
            console.log("Account deletion error: " + error);
        });

        // res.redirect('Home');
    }
};

//Export accountController to be used
module.exports = accountController;