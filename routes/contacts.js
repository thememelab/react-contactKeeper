const express = require("express")
const router = express.Router();


const auth = require("../middleware/auth")
const User  = require("../models/User");
const Contact = require("../models/Contacts");
const { check, validationResult } = require('express-validator');


// @route  GET api/contacts
// @desc   Get all users conatact
// @access Private

router.get('/', auth, async(req,res) => {
    try {
    const contacts = await Contact.find({user: req.user.id}).sort({date:-1});
     res.json(contacts)
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

    //res.send("Get all your contacts")
})

// @route  Post api/contacts
// @desc   Add a new contact
// @access Private
router.post('/', [ auth ,
    [
    check('name', "`please add name is required")
    .not()
    .isEmpty()
    ] ], 
    async (req,res) => {

const errors = validationResult(req)
if(!errors.isEmpty()){
return res.status(400).json({error: errors.array()});
}

const {name, email, phone, type} = req.body 

try {

const newConatact = new Contact({
name, 
email, 
phone, 
type ,
user: req.user.id
})
const contact = await newConatact.save();
res.json(contact)
} 
    catch (err) {
    console.error(err.message)  
    res.status(500).send( "Sever Error" )
    }
})

// @route  Post api/contacts/:id
// @desc   Update a conatact
// @access Private

router.put('/:id', auth, async(req,res) => {


const {name, email, phone, type } = req.body

const cntID = req.params.id

const contactFields  = {};
if(name) contactFields.name = name;
if(email) contactFields.email = email;
if(phone) contactFields.phone = phone;
if(type) contactFields.type = type;


try {
    let contact = await Contact.findById(req.params.id,)
    if (!contact){ 
     return res.status(404).json({msg:"Conatct not found"})
    }
     // Make sure user owns the conatact
    if(contact.user.toString() !== req.user.id) {
    return res.staus(401).json({ msg: "Not Authorised"})
    }
    contact = await Contact.findByIdAndUpdate(req.params.id, 
        {$set: contactFields}, { new :true })
        res.json(contact)
    } 
    catch (err) {
    console.error(err.message)  
    res.status(500).send( "Sever Error" )
    }
})

// @route  Post api/contacts/:id
// @desc   delete a conatact
// @access Private

router.delete('/:id', auth, async(req,res) => {

const cntID = req.params.id

try {

    let contact = await Contact.findById(req.params.id)

    if (!contact){ 
     return res.status(404).json({msg:"Conatct not found"})
    }

     // Make sure user owns the conatact
    if(contact.user.toString() !== req.user.id) {
    return res.staus(401).json({ msg: "Not Authorised"})
    }

    contact = await Contact.findByIdAndRemove(req.params.id)
        res.send(" Contact successfull removed")
    } 

    catch (err) {
    console.error(err.message)  
    res.status(500).send( "Sever Error" )
    }
})

module.exports = router;