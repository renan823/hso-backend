const { upload } = require("../services/FileService");

const router = require("express").Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        throw new ServerException("Nenhum arquivo enviado", 400);
    }

    
})

module.exports = router;