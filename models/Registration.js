const mongoose = require('mongoose')


const regSchema = new mongoose.Schema({

    fname: {
        type: String
    },
    mob: {
        type: String
    },
    gender:{
        type: String
    },
    age:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pic:{
        type:String
    },
    verify:{
        type:String
    },
    flag:{
        type:String
    },
    pass:{
        type:String
    },
    email:{
        type:String
    },
    V_ID:{
        type:String
    }
});

module.exports = mongoose.model('Registration',regSchema)