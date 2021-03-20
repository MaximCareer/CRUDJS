const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://test:s3r6tQHb24KVMXK6@cluster0.1cg4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()
const multer = require("multer");
const path = require("path")
var cors = require('cors')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(cors())
app.use(express.json())

const alienRouter = require('./routes/aliens')
app.use('/aliens', alienRouter)

const registrationRouter = require('./routes/Registration')
app.use('/auth', registrationRouter)


const productRouter = require('./routes/Product')
app.use('/product', productRouter)


const videoRouter = require('./routes/VideoCourse')
app.use('/video', videoRouter)

const questionRouter = require('./routes/Questions')
app.use('/questions', questionRouter)

const eBookRouter = require('./routes/EBook')
app.use('/ebook', eBookRouter)


const email = require('./routes/nodeMail')
app.use('/email', email)

const Exam = require('./routes/Exams')
app.use('/exam', Exam)

// This Code is for uploaing files 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname.split(".")[0]}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    }
})

app.use('/data', express.static('upload/images'));
app.post("/uploadData", upload.single('data'), (req, res) => {
    if (req.headers.token == global.config.api.token) {
       
        if(req.headers.videodata == "true"){
            res.json({
                success: 1,
                profile_url: `upload/images/` + req.file.filename
            })
        }
        else{
            res.json({
                success: 1,
                profile_url: `data/` + req.file.filename
            })
        }
        
    }
})
app.use(errHandler);

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        });

    }
}
module.exports = global.config = {
    api: {
        token: "f0n9H91UedVFiYQih3VPzX7AMLRuvPC5nz93HfngMYc=",
        authKey: "9429370873"
    }

};


app.listen(9000, () => {
    console.log('Server started')
})