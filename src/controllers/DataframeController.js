const { toJSON } = require("danfojs-node");
const DataframeService = require("../services/DataframeService");
const ServerException = require("../utils/ServerException");

const router = require("express").Router();

router.get("/:filename", async (req, res, next) => {
    const { filename } = req.params;

    if (!filename) {
        return next(new ServerException("Nenhum arquivo selecionado", 400));
    }
    
    try {
        let dataframe = await DataframeService.create(filename);

        const rows = dataframe.shape[0]

        await DataframeService.save(filename, dataframe);

        dataframe = toJSON(dataframe.head(10));

        return res.json({ dataframe, filename, rows });
    } catch (error) {
        return next(error);
    }
})

router.post("/alter", async (req, res, next) => {
    const { filename, columns } = req.body;

    if (!filename) {
        return next(new ServerException("Nenhum arquivo selecionado", 400));
    }

    try {
        let dataframe = await DataframeService.dropColumns(filename, [...columns]);

        await DataframeService.save(filename, dataframe);

        dataframe = toJSON(dataframe.head(10));

        return res.json({ dataframe, filename, rows });
    } catch (error) {
        return next(error);
    }
})

module.exports = router;