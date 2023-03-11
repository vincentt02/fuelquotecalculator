const express = require('express');
//creates application variable
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));

//importing the routes
const registerRoute = require('./routes/Register')
//syntax to use our register middleware
app.use('/Register', registerRoute)

//our server is listening on this port for requests
app.listen(PORT, () => {
    console.log('Server started on port ${PORT}');
});