const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/files", require("./src/controllers/FileController"));
app.use("/api/dataframes", require("./src/controllers/DataframeController"));

app.listen(5000, () => console.log("ready"))
