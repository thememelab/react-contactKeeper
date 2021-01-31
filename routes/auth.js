const express = require("express");
const router = express.Router();

// @route  GET api/auth
// @desc   Get all users conatact
// @access Private

router.get('/', (req,res) => {
    res.send("Get loggedin user")
})

router.post('/', (req,res) => {
    res.send("Get loggedin user")
})


module.exports = router;