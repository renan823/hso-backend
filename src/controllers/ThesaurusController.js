const DataframeService = require("../services/DataframeService");
const ThesaurusService = require("../services/ThesaurusService");
const Thesaurus = require("../utils/Thesaurus");

const router = require("express").Router();

router.post("/fill", async (req, res, next) => {
    const { filename } = req.body;

    const thesaurus = new Thesaurus();

    const dataframe = await DataframeService.create(filename);

    if (!dataframe) {
        return res.json("bad")
    }

    thesaurus.fill(dataframe);

    return res.json("ok");
})

module.exports = router;