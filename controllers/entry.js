const mongoose = require('mongoose');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
require('../models/data_entry');
require('../models/user');
require('../models/bank');

const salesEntry = mongoose.model('salesEntry');
const user = mongoose.model('user');
const bank = mongoose.model('bank');

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

    exports.getBankDetails = async (req, res) => {
        await bank.find({email: req.query.email}, (err, data)=> {
            if(err){
                res.send(err);
            }else {
                res.send(data);
            }
        })
    }
    exports.saveBankDetails = async (req, res) => {
        
        const upd = {
            email: req.body.email,
            accountNumber : req.body.accountNumber,
            accountName : req.body.accountName,
            bankName : req.body.bankName,
            bankBranch : req.body.bankBranch,
            ifsc : req.body.ifsc
        }
        await bank.findOne({email: req.body.email}, async (err, user)=>{
            if(user){

                user.accountNumber = req.body.accountNumber;
                user.accountName = req.body.accountName;
                user.bankName = req.body.bankName;
                user.bankBranch = req.body.bankBranch;
                user.ifsc = req.body.ifsc;
                user.save();
                res.send(user);

            }
            else {
                await bank.create(upd ,async (err, details)=> {
                    if(err){
                        res.send(err);
                    }else {
                        res.send(details)
                    }
                })
            }
        })
    }

    exports.confirmSale = async (req,res)=> {
        await user.findById(req.body.email, async(err,user)=>{ 
            if(err){
                res.send(err);
            }
            else {
                const data = {
                    email: user.email,
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
            }
        })
    }

    
