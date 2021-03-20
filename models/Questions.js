const mongoose = require('mongoose')


const QuestionSchema = new mongoose.Schema({
    // cource_id:{
    //     type: String
    // },
    // exm_id:{
    //     type:String
    // },
    // Question:{
    //     type: String
    // },
    // A:{
    //     type: String
    // },
    // B:{
    //     type: String
    // },
    // C:{
    //     type:String
    // },
    // D:{
    //     type: String
    // },
    // Ans:{
    //     type:String
    // },
    // Mark:{
    //     type: String
    // },
    // Negative:{
    //     type:String
    // }
    course_id:{
        type:String
    },
    data:{
        type:Array
    }

});

module.exports = mongoose.model('Questions',QuestionSchema)