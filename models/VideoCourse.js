const mongoose = require('mongoose')


const videoCourseSchema = new mongoose.Schema({
    cource_id:{
        type: String
    },
    topic:{
        type: String
    },
    subtopic:{
        type: String
    },
    length:{
        type: String
    },
    description:{
        type: String
    },
    videoUrl:{
        type:String
    }

});

module.exports = mongoose.model('VideoCourse',videoCourseSchema)