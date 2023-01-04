const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const DB = require("./config/db");

//Routes Import
const documentRoutes = require("./routes/documents");

//Database
DB();

//Routes
app.use("/api/v1/documents", documentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
