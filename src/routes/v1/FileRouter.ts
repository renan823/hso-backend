import express from "express";
import FileController from "../../controllers/FileController";
import uploadMiddleware from "../../middlewares/upload";

class FileRouter {

    handler: express.Router;
    private controller: FileController;

    constructor () {
        this.handler = express.Router();
        this.controller = new FileController();

        this.setRoutes();
    }

    private setRoutes (): void {
        this.handler.get("/all", this.controller.findAllFiles);

        this.handler.post("/save", uploadMiddleware.single("file"), this.controller.saveNewFile);
    }
}

export default FileRouter;