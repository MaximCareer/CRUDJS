const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pic:{
        type: String
    },
    name:{
        type: String
    },
    author:{
        type: String
    },
    s_price:{
        type: Number
    },
    o_price:{
        type: Number
    },
    discount:{
        type: Number
    },
    description:{
        type: String
    },
    features:{
        type: String
    },
    validity:{
        type: String
    },
    language:{
        type: String
    },
    category:{
        type: String
    },
    IsActive:{
        type: Boolean
    },
    AdminID:{
        type: String
    },
    created:{
        type: String
    },
    modified:{
        type: String
    },
    createdBy:{
        type: String
    },
    modifiedBy:{
        type: String
    },
    combo:{
        type: Array
    }
});
module.exports = mongoose.model('Product',productSchema)