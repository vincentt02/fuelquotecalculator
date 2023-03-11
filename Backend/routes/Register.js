const express = require('express');
const router = express.Router();

router.use(express.json())

//need to create a new user objects and prepare it for insertion into the DB
router.post('/', (req, res) =>{
    console.log("post route running.");
    
    const {username} = req.body;
    const {password} = req.body;
      
    res.send(`Welcome ${username}`);
    res.send("New User Created!");
});







//exporting the module: keep at bottom
module.exports = router;
