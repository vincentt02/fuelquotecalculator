const express = require('express')
const app = express()

const loginModuleRoute = require("./routes/LoginModule")
app.use("/Login", loginModuleRoute);

app.listen(8080, () => {
    console.log("Server started on port 8080")
})