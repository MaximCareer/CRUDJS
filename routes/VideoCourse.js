const express = require('express')
const router = express.Router()
const VideoCourse = require('../models/VideoCourse')
var CryptoJS = require("crypto-js");
const fs = require('fs')


router.get('/', async (req, res) => {
    try {
        if (req.headers.token == global.config.api.token) {
            const video = await VideoCourse.find()
            res.json(video)
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
            const product = await VideoCourse.findById(req.params.id)
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(product), global.config.api.authKey).toString();
            res.json(product)
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
        const video = new VideoCourse({
            cource_id: req.body.cource_id,
            topic: req.body.topic,
            subtopic: req.body.subtopic,
            length: req.body.length,
            description: req.body.description,
            videoUrl: req.body.videoUrl

        });


        try {
            const a1 = await video.save()
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
            const product = await VideoCourse.findById(req.params.id)
            req.body.topic ? product.topic = req.body.topic : "";
            req.body.subtopic ? product.subtopic = req.body.subtopic : "";
            req.body.length ? product.length = req.body.length : "";
            req.body.description ? product.description = req.body.description : "";


            const a1 = await product.save()
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(a1), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
        else {
            res.json("Invalid Request")
        }
    } catch (err) {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Error"), global.config.api.authKey).toString();
        res.json(ciphertext)
    }

})

router.delete('/:id', async (req, res) => {
    try {
        if (req.headers.token == global.config.api.token) {
            const product = await VideoCourse.findById(req.params.id)

            try {
                var video = fs.realpathSync(product.videoUrl, []);
                fs.unlinkSync(video);
            }
            catch (error) {

            }
            const a1 = await product.deleteOne()
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(a1), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
        else {
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Invalid"), global.config.api.authKey).toString();
            res.json(ciphertext)
        }
    } catch (err) {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(err), global.config.api.authKey).toString();
        res.json(ciphertext)
    }
});

module.exports = router