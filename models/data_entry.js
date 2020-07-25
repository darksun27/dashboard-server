const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesEntry = new Schema ({
    email: {
      type: String,
      lowercase: true
    },
    customer: {
      type: String
    },
    product: {
        type: String
    }
});

module.exports = mongoose.model('salesEntry', salesEntry);