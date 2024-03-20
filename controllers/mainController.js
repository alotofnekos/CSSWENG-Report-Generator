const mongoose = require('mongoose');
// const repairModel = require('../models/repairSchema.js')

const mainController = {
    //Load Home Page
    getMain: async function(req, res) {
        res.render('home');
    },

    // getMain: async function(req, res) {
    //     res.render('home');
    // },

    //Load Per Model Page
    // get: async function(req, res) {
    //     res.render('IQPM');
    // },

    // //Load Per Model Page
    // getMain: async function(req, res) {
    //     res.render('PTPM');
    // },

    // //Load Top Defects Per Model Page
    // getTopDefectsPerModel: async function(req, res) {
    //     res.render('TDPM');
    // },
};

module.exports = mainController;