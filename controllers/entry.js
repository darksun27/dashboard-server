const mongoose = require('mongoose');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
require('../models/data_entry');

const salesEntry = mongoose.model('salesEntry');

exports.newEntry = async (req, res) => {
        const data = {
            email: req.body.email,
            customer: req.body.customer,
            product: req.body.product
        };
        await salesEntry.create(data, (err, data) => {
            if(err) {
                res.send(err)
            }else {
                res.send('Done');
            }
        })
    };

    exports.getSalesPerson = async (req, res) => {
        await salesEntry.find({email: req.query.email}, (err, data) => {
            if(err) {
                res.send(err);
            }else {
                res.send(data);
            }
        })
    }

    exports.deleteSale = async (req, res) => {
        await salesEntry.findByIdAndRemove(req.query.id, (err)=> {
            if(err){
                res.send(err);
            }
            else {
                res.send("Delete Done");
            }
        })
    }

    exports.getSalesAll = async(req, res) => {
        await salesEntry.find({}, (err, data) => {
            if(err) {
                res.send(err)
            }else {
                res.send(data);
            }
        })
    }

    exports.getSales = async (req, res) => {
        await salesEntry.find({ email: req.user.email }, (err, data) => {
            if(err) {
                res.send(err)
            }else {
                res.send(data);
            }
        })
    }
