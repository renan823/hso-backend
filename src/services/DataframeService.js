const ServerException = require("../utils/ServerException");
const { DataFrame, readCSV, toCSV } = require("danfojs-node");
const { writeFile } = require("fs/promises");

const path = "./uploads/";

class DataframeService {
    static async create (filename) {
        if (!filename) {
            throw new ServerException("Erro na leitura do arquivo", 500);
        }

        let dataframe = await readCSV(`${path}${filename}`);
            
        if (!typeof dataframe instanceof DataFrame) {
            throw new ServerException("Erro na leitura do arquivo", 500);
        }

        dataframe = dataframe.applyMap((x) => {
            if (x === null || x === "null") {
                return "";
            }
            return `${x}`.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '')
        })

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
            let dataframe = await this.create(filename)

            if (!typeof dataframe instanceof DataFrame) {
                throw new ServerException("Erro na leitura do arquivo", 500);
            }
           
            columns.forEach((column) => {
                if (dataframe.columns.includes(column)) {
                    dataframe = dataframe.drop({ columns: [column] });
                }
            })

            return dataframe;
        } catch (error) {
            throw new ServerException("Erro ao alterar o Dataframe", 500);
        }
    }

    static async applyFilter (filename, filter) {
        let dataframe = await this.create(filename)

        try {
            dataframe = dataframe.applyMap((item) => { 
                if (filter.hasOwnProperty(`${item}`)) {
                    return filter[`${item}`];
                } 
                return item;
            });
        
            return dataframe;
        } catch (error) {
            throw new ServerException("Erro na aplicação do filtro", 500);
        }
    }

    static async joinColumns (filename) {
        console.log("oi")
        let dataframe = await this.create(filename);

        dataframe.head().print()

        try {
            dataframe.apply((row) => {
                row = row.filter(value => value != "");
                console.log(row)
                return row
            }, { axis: 1 })
            
            return dataframe;
        } catch (error) {
            throw new ServerException("Erro na junção de colunas", 500);
        }
    }
}

module.exports = DataframeService;