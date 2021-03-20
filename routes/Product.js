const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
var CryptoJS = require("crypto-js");


router.get('/', async (req, res) => {
    try {
        if (req.headers.token == global.config.api.token) {
            const product = await Product.find()
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
            const product = await Product.findById(req.params.id)
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
        const product = new Product({
            pic: req.body.pic,
            name: req.body.name,
            author: req.body.author,
            s_price: req.body.s_price,
            o_price: req.body.o_price,
            discount: req.body.discount,
            description: req.body.description,
            features: req.body.features,
            validity: req.body.validity,
            language: req.body.language,
            category: req.body.category,
            IsActive: req.body.IsActive,
            AdminID: req.body.AdminID,
            created: req.body.created,
            modified: req.body.modified,
            createdBy: req.body.createdBy,
            modifiedBy: req.body.modifiedBy,
            combo: req.body.combo
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
            const product = await Product.findById(req.params.id)
            req.body.pic ? product.pic = req.body.pic : "";
            req.body.name ? product.name = req.body.name : "";
            req.body.author ? product.author = req.body.author : "";
            req.body.s_price ? product.s_price = req.body.s_price : "";
            req.body.o_price ? product.o_price = req.body.o_price : "";
            req.body.discount ? product.discount = req.body.discount : "";
            req.body.description ? product.description = req.body.description : "";
            req.body.features ? product.features = req.body.features : ""
            req.body.validity ? product.validity = req.body.validity : ""
            req.body.language ? product.language = req.body.language : ""
            req.body.category ? product.category = req.body.category : ""
            req.body.IsActive ? product.IsActive = req.body.IsActive : ""
            req.body.AdminID ? product.AdminID = req.body.AdminID : ""
            req.body.modified ? product.modified = req.body.modified : ""
            req.body.modifiedBy ? product.modifiedBy = req.body.modifiedBy : ""
            req.body.combo ? product.combo = req.body.combo : ""

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
            const product = await Product.findById(req.params.id)
            const a1 = await product.deleteOne()
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify("Deleted"), global.config.api.authKey).toString();
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