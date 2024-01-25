const FileService = require("../services/FileService");
const upload = require("../middlewares/upload");
const ServerException = require("../utils/ServerException");

const router = require("express").Router();

router.post("/upload", upload.single("file"), async (req, res, next) => {
    if (!req.file) {
        return next(new ServerException("Nenhum arquivo enviado", 400));
    }

    return res.status(201).json({ message: "Arquivo salvo" });
})

router.get("/count", async (req, res) => {
    try {
        const { files, amount } = await FileService.count();

        return res.status(200).json({ files, amount });
    } catch (error) {
        return next(error);
    }
})

router.get("/", async (req, res) => {
    try {
        const files = await FileService.fetchAll();

        return res.status(200).json(files);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;