const express = require("express");
const router = express.Router();
const config = require('config');
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User  = require("../models/User");
const { check, validationResult } = require('express-validator');
const jwtSct  = config.get("jwtSecret");
const saltRounds = 10;


// @route  GET api/users
// @desc   Get all users conatact
// @access Private

router.get('/', (req,res) => {
    res.send("Register as user")
})

// @route  Post api/users
// @desc   Register as user
// @access Private
router.post('/', 
[
check('name', "`please add name is required")
.not().isEmpty(),
check('email', "`please add email")
.not().isEmpty(),
check('password', 'please add a password').isLength({ min: 5 })
],

async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    const {name, email, password } = req.body

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg : "User Already exixts"});
        }
        user = new User({
            name,
            email,
            password
        })

        user.password = await bcrypt.hash(password, saltRounds) 
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

    jwt.sign(payload, jwtSct , 
    { expiresIn:360000 
    }, (err, token) => {
        if(err) throw err;
        res.json({token});
        }
    );
        //res.send("passed")
    }
    catch (err){
    console.log(err.message);
    res.status(500).send('Server');
    }
    //res.send("Register as user")
})


module.exports = router;
