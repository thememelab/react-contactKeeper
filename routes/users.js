const express = require("express")
const router = express.Router();
 
// @route  GET api/users
// @desc   Get all users conatact
// @access Private

router.get('/', (req,res) => {
    res.send("Register as user")
})



// @route  Post api/users
// @desc   Register as user
// @access Private

router.post('/', (req,res) => {
    res.send("Register as user")
})




module.exports = router;
