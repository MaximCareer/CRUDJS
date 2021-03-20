const express = require('express')
const router = express.Router()
const Exams = require('../models/Exams')
var CryptoJS = require("crypto-js");

router.get('/', async (req, res) => {
    if (req.headers.token == global.config.api.token) {
        try {
            const exm = await Exams.find()
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(exm), global.config.api.authKey).toString();
            res.json(ciphertext)
        } catch (err) {
            res.send('Error ' + err)
        }
    }
})

router.get('/:id', async (req, res) => {
    try {
        const exm = await Exams.findById(req.params.id)
        res.json(exm)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/', async (req, res) => {
    if (req.headers.token == global.config.api.token) {
        const exm = new Exams({
            cource_id: req.body.cource_id,
            exam_id: req.body.exam_id,
            date: req.body.date,
            s_time: req.body.s_time,
            e_time: req.body.e_time,
            totalMarks: req.body.totalMarks,
            type: req.body.type,
            name: req.body.name,
            NoOfQuestion: req.body.NoOfQuestion,
            IsActive: req.body.IsActive,
            createdBy: req.body.createdBy,
            Created: new Date()
        })


        try {
            const a1 = await exm.save()
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(a1), global.config.api.authKey).toString();
            res.json(ciphertext)
        } catch (err) {
            res.send('Error')
            console.log(err);
        }
    }
})

router.patch('/:id', async (req, res) => {

    if (req.headers.token == global.config.api.token) {
        try {
            const exm = await Exams.findById(req.params.id)
            req.body.cource_id ? exm.cource_id = req.body.cource_id : "";
            req.body.exam_id ? exm.exam_id = req.body.exam_id : "";
            req.body.date ? exm.date = req.body.date : "";
            req.body.s_time ? exm.s_time = req.body.s_time : "";
            req.body.e_time ? exm.e_time = req.body.e_time : "";
            req.body.totalMarks ? exm.totalMarks = req.body.totalMarks : "";
            req.body.type ? exm.type = req.body.type : "";
            req.body.name ? exm.name = req.body.name : "";
            req.body.NoOfQuestion ? exm.NoOfQuestion = req.body.NoOfQuestion : "";
            req.body.IsActive ? exm.IsActive = req.body.IsActive : "";



            const a1 = await exm.save()
            res.json(a1)
        } catch (err) {
            res.send('Error')
        }
    }
    else {
        res.send('Invalid Request')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        if (req.headers.token == global.config.api.token) {
            const exm = await Exams.findById(req.params.id)
            const a1 = await exm.deleteOne()
            res.json(a1)
        }
        else {
            res.json("Invalid Request")
        }
    } catch (err) {
        res.send('Error')
    }
});


module.exports = router