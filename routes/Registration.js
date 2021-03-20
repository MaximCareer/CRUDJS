const express = require('express')
const router = express.Router()
const Registration = require('../models/Registration')
var CryptoJS = require("crypto-js");

async function AuthenticateRequest(token) {
    const registration = await Registration.findById(token);
    var IsRegistered = registration != null ? true : false;
    return IsRegistered;
}

router.get('/', async (req, res) => {
    try {
        var authenticated = await AuthenticateRequest(req.headers.token)
        if (authenticated) {
            const registration = await Registration.find()
            res.json(registration)
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
            const registration = await Registration.findOne({ email: req.params.id })
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(registration), global.config.api.authKey).toString();
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
        const registration = new Registration({
            fname: req.body.fname,
            mob: req.body.mob,
            gender: req.body.gender,
            age: req.body.age,
            city: req.body.city,
            state: req.body.state,
            pic: req.body.pic,
            verify: req.body.verify,
            flag: req.body.flag,
            pass: req.body.pass,
            email: req.body.email,
            V_ID: req.body.V_ID,
        });


        try {
            const isExist = await Registration.findOne({ email: req.body.email })

            if (!isExist) {
                const a1 = await registration.save()
                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(a1), global.config.api.authKey).toString();
                res.json(ciphertext)
            }
            else {
                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Email Already Exist"), global.config.api.authKey).toString();
                res.json(ciphertext)

            }
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
        const registration = await Registration.findById(req.params.id)
        req.body.fname ? registration.fname = req.body.fname : "";
        req.body.mob ? registration.mob = req.body.mob : "";
        req.body.gender ? registration.gender = req.body.gender : "";
        req.body.age ? registration.age = req.body.age : "";
        req.body.city ? registration.city = req.body.city : "";
        req.body.state ? registration.state = req.body.state : "";
        req.body.pic ? registration.pic = req.body.pic : "";
        req.body.verify ? registration.verify = req.body.verify : "";
        req.body.flag ? registration.flag = req.body.flag : "";
        req.body.pass ? registration.pass = req.body.pass : "";
        req.body.email ? registration.email = req.body.email : "";
        req.body.V_ID ? registration.V_ID = req.body.V_ID : "";

        const a1 = await registration.save()
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(a1), global.config.api.authKey).toString();
        res.json(ciphertext)
    } catch (err) {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Error"), global.config.api.authKey).toString();
        res.json(ciphertext)
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id)
        const a1 = await registration.deleteOne()
        res.json("Deleted")
    } catch (err) {
        res.send('Error')
    }
});

module.exports = router