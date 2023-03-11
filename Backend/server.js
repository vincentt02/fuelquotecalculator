const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const LoginModuleRoute = require("./routes/LoginModule")
app.use("/Login", LoginModuleRoute);

app.listen(8080, () => {
    console.log("Server started on port 8080")
})