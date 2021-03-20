const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    cource_id:{
        type: String
    },
    exam_id:{
        type: String
    },
    date:{
        type: String
    },
    s_time:{
        type: String
    },
    e_time:{
        type: String
    },
    totalMarks:{
        type: String
    },
    type:{
        type: String
    },
    name:{
        type: String
    },
    NoOfQuestion:{
        type: String
    },
    IsActive:{
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

module.exports = mongoose.model('Exam',examSchema)