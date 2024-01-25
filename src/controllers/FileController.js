const FileService = require("../services/FileService");
const upload = require("../middlewares/upload");
const ServerException = require("../utils/ServerException");

const router = require("express").Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        throw new ServerException("Nenhum arquivo enviado", 400);
    }

    return res.status(201).json({ message: "Arquivo salvo" });
})

router.get("/count", async (req, res) => {
    const { files, amount } = await FileService.count();

    return res.status(200).json({ files, amount });
})

router.get("/", async (req, res) => {
    const files = await FileService.fetchAll();

    return res.status(200).json(files);
})

module.exports = router;