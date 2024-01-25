const ThesaurusService = require("../services/ThesaurusService");

const router = require("express").Router();

router.post("/fill", async (req, res, next) => {
    const { filename } = req.body;

    await ThesaurusService.fill(filename);

    //pegar o arquivo
    //ler o arquivo
    //juntar colunas na coluna target
    return res.json("ok");
})

module.exports = router;