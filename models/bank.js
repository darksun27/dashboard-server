const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankRecord = new Schema ({
    email: String,
    accountNumber: String,
    accountName: String,
    bankName: String,
    bankBranch: String,
    ifsc: String
});

module.exports = mongoose.model('bank', bankRecord);