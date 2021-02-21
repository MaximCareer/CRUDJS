const express = require('express')
const router = express.Router()
const Registration = require('../models/Registration')



router.get('/', async(req,res) => {
    try{
           const registration = await Registration.find()
           res.json(registration)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const registration = await Registration.findById(req.params.id)
           res.json(registration)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const registration = new Registration({
        fname: req.body.fname,
        mob: req.body.mob,
        gender: req.body.gender,
        age:req.body.age,
        city: req.body.city,
        state: req.body.state,
        pic: req.body.pic,
        verify:req.body.verify,
        flag: req.body.flag,
        pass: req.body.pass,
        email: req.body.email,
        V_ID:req.body.V_ID,
    })
    

    try{
        const a1 =  await registration.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
        console.log(err);
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const registration = await Registration.findById(req.params.id) 
        registration.sub = req.body.sub
        const a1 = await registration.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

module.exports = router