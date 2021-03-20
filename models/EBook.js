const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
    pic:{
        type: String
    },
    name:{
        type: String
    },
    author:{
        type: String
    },
    link:{
        type: String
    },
    createdBy:{
        type: String
    },
    Created:{
        type: String
    },
    ModifiedBy:{
        type: String
    },
    Modified:{
        type: String
    }
});

module.exports = mongoose.model('EBook',ebookSchema)