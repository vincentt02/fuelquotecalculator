const express = require('express')
const app = express()

const LoginModuleRoute = require("./routes/LoginModule")
app.use("/Login", LoginModuleRoute);

app.listen(8080, () => {
    console.log("Server started on port 8080")
})