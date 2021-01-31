const express = require("express")
const router = express.Router();

// @route  GET api/contacts
// @desc   Get all users conatact
// @access Private

router.get('/', (req,res) => {
    res.send("Get all your contacts")
})

// @route  Post api/contacts
// @desc   Add a new contact
// @access Private

router.post('/', (req,res) => {
    res.send("Add a new contacts")
})

// @route  Post api/contacts/:id
// @desc   Update a conatact
// @access Private

router.put('/:id', (req,res) => {
    res.send("Update a contact")
})


// @route  Post api/contacts/:id
// @desc   delete a conatact
// @access Private

router.delete('/:id', (req,res) => {
    res.send("delete a contact")
})

module.exports = router;