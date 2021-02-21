const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://test:s3r6tQHb24KVMXK6@cluster0.1cg4w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()
const multer = require("multer");
const path = require("path")

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)

const registrationRouter = require('./routes/Registration')
app.use('/auth',registrationRouter)

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

app.use('/profile', express.static('upload/images'));
app.post("/upload", upload.single('profile'), (req, res) => {

    res.json({
        success: 1,
        profile_url: `upload/images/`+req.file.filename
    })
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

app.listen(9000, () => {
    console.log('Server started')
})