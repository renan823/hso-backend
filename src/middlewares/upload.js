const multer = require("multer");
const allowedExtensions = require("../utils/allowedExtensions");
const ServerException = require("../utils/ServerException");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = new Date().toISOString().split(".")[0];
        file.filename = `${uniqueSuffix}.${file.originalname.split(".")[1]}`;
        cb(null, `${uniqueSuffix}.${file.originalname.split(".")[1]}`);
    }
})

const filter = (req, file, cb) => {
    const extension = file.originalname.split(".")[1];
    if (allowedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new ServerException("Extensão inválida", 415));
    }
}

const upload = multer({ storage: storage, fileFilter: filter });

module.exports = upload;