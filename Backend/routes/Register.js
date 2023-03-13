const express = require('express');
const router = express.Router();

router.use(express.json())
//need to create a new user objects and prepare it for insertion into the DB
router.post('/', (req, res) =>{
    console.log("post route running.");
    
    const { username, password } = req.body;
    
    res.status(201).json({ message: 'Registration successful' });
    //res.send(`Welcome ${username}, your account was created with the password ${password}!`);
});



//exporting the module: keep at bottom
module.exports = router;
