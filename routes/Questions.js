const express = require('express')
const router = express.Router()
const Questions = require('../models/Questions')
var CryptoJS = require("crypto-js");


router.get('/', async (req, res) => {
    try {
        if (req.headers.token == global.config.api.token) {
            const product = await Questions.find()
            res.json(product)
        }
        else {
            res.json("No Access")
        }


    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        if (req.headers.token == global.config.api.token) {
            const product = await Questions.findById(req.params.id)
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(product), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
        else {
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Invalid Request"), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.post('/', async (req, res) => {
    if (req.headers.token == global.config.api.token) {
        const product = new Questions({
            data:req.body.questions,
            course_id:req.body.course_id
        });


        try {
            const a1 = await product.save()
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(a1), global.config.api.authKey).toString();
            res.json(ciphertext)

        } catch (err) {
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify('Error'), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
    }
    else {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify('No Token Valid'), global.config.api.authKey).toString();
        res.json(ciphertext)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        if (req.headers.token == global.config.api.token) {
            const que = await Questions.findById(req.params.id)
            const QueID = req.body.QueID;
            
            var UpdateQueID = 0;
            que.data.filter((x,id)=>{
                x.ID == QueID ? UpdateQueID = id:""
            });
            req.body.Question ? que.data[UpdateQueID].Question = req.body.Question : "";
            req.body.A ? que.data[UpdateQueID].A = req.body.A : "";
            req.body.B ? que.data[UpdateQueID].B = req.body.B : "";
            req.body.C ? que.data[UpdateQueID].C = req.body.C : "";
            req.body.D ? que.data[UpdateQueID].D = req.body.D : "";
            req.body.Ans ? que.data[UpdateQueID].Ans = req.body.Ans : "";
            req.body.Marks ? que.data[UpdateQueID].Marks = req.body.Marks : "";
            req.body.Negative ? que.data[UpdateQueID].Negative = req.body.Negative : "";
           
            var TotalMarks = 0.00;
            que.data.forEach(element => {
                TotalMarks += element.Marks;
            });
            var ExamMeta = [{"NoQ":que.data.length},{"TotalMarks":TotalMarks}]
            console.log(ExamMeta)
            que.markModified("data");
            const a1 = await que.save();
            
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify({a1,ExamMeta}), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
        else {
            res.json("Invalid Request")
        }
    } catch (err) {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(err), global.config.api.authKey).toString();
        res.json(ciphertext)
    }

})

router.delete('/:id', async (req, res) => {
    try {
        if (req.headers.token == global.config.api.token) {
            const que = await Questions.findById(req.params.id)
            const QueID = parseInt(req.headers.queid)
            console.log(QueID)
            que.data.filter((x,id)=>{
                x.ID == QueID ? que.data.splice(id,1):""
            })
            
            var TotalMarks = 0.00;
            que.data.forEach(element => {
                TotalMarks += element.Marks;
            });
            var ExamMeta = [{"NoQ":que.data.length},{"TotalMarks":TotalMarks}]
            console.log(ExamMeta)
            
            que.markModified("data");
            const a1 = await que.save();
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify({a1,ExamMeta}), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
        else {
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Invalid"), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
    } catch (err) {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Failed"), global.config.api.authKey).toString();
        res.json(ciphertext)
    }
});

module.exports = router