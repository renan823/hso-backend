const ServerException = require("../utils/ServerException");
const { DataFrame, readCSV, toCSV } = require("danfojs-node");
const { writeFile } = require("fs/promises");

const path = "./uploads/";

class DataframeService {
    static async create (filename) {
        let dataframe = await readCSV(`${path}${filename}`);
            
        if (!typeof dataframe instanceof DataFrame) {
            throw new ServerException("Erro na leitura do arquivo", 500);
        }

        dataframe = dataframe.applyMap((x) => `${x}`.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, ''))

        let columns = dataframe.columns.map((column) => `${column}`.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, ''))

        dataframe.$setColumnNames(columns);

        return dataframe;
    }

    static async save (filename, dataframe) {
        try {
            const csv = await toCSV(dataframe);

            await writeFile(`${path}${filename}`, csv);

            return;
        } catch (error) {
            throw new ServerException("Erro ao salvar o Dataframe", 500);
        }
    }

    static async dropColumns (filename, columns) {
        try {
            let dataframe = await readCSV(`${path}${filename}`);

            if (!typeof dataframe instanceof DataFrame) {
                throw new ServerException("Erro na leitura do arquivo", 500);
            }

            dataframe = dataframe.drop({ columns });

            return dataframe;
        } catch (error) {
            throw new ServerException("Erro ao salterar o Dataframe", 500);
        }
    }
}

module.exports = DataframeService;