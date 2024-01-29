const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }))

app.use("/api/files", require("./src/controllers/FileController"));
app.use("/api/dataframes", require("./src/controllers/DataframeController"));
app.use("/api/thesaurus", require("./src/controllers/ThesaurusController"));

app.use(require("./src/middlewares/errors"))

app.listen(5000, () => console.log("ready"))
