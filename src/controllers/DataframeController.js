const ServerException = require("../utils/ServerException");

const router = require("express").Router();

router.get("/:filename", (req, res) => {
    const { filename } = req.params;

    if (!filename) {
        throw new ServerException("Nenhum arquivo selecionado", 400);
    }
    
    
})

module.exports = router;