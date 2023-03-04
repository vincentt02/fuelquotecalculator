const express = require("express");
const app = express();
const PORT = 8080;

const ClientProfileManagementRoute = require("./routes/ClientProfileManagementModule");
app.use("/api/clientprofilemanagement", ClientProfileManagementRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
