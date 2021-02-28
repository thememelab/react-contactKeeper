const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")

const User  = require("../models/User");
const config = require('config');
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwtSct  = config.get("jwtSecret");
const saltRounds = 10;

// @route  GET api/auth
// @desc   Get all users conatact
// @access Private
router.get('/', auth , async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(user){
            res.json(user)
        }
        }
    catch(err){
        return res.status(500).json({msg : "Sever Error"});
        }
})
// @route  Post api/auth
// @desc   Get all users conatact
// @access Private
router.post('/', 
    [
        check('email', "`please include a valid email").isEmail(),
        check('password', 'please is required').exists()
        ],
        async (req,res) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({error: errors.array()});
            }
            const { email, password } = req.body

            try {
                let user = await User.findOne({email});
                if(!user){
                    return res.status(400).json({msg : "Invalid credential or user does not exits"});
                }

                console.log(password, user.password);

               const isMatch =  await bcrypt.compare(password, user.password);

               if(!isMatch){
                return res.status(400).json({msg : "Invalid credential or user does not exits"});
               }

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
                } );
            //res.send("passed")
            }
            catch (err){
            console.log(err.message);
            res.status(500).send('Server Error');
            
            }
            
        })


module.exports = router;