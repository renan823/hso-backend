const ServerException = require("../utils/ServerException");
const allowedExtensions = require("../utils/allowedExtensions");
const { readdir, writeFile } = require("fs/promises");


const path = "./uploads/";

class FileService {
    static async delete () {
        return;
    }

    static async count () {
        try {
            const files = await readdir(path);

            const sortedByDay = {};

            files.forEach((file) => {
                const [year, month, day] = file.split("T")[0].split("-");

                const date = `${day}/${month}/${year}`;

                sortedByDay.hasOwnProperty(date) ?  sortedByDay[date] += 1 : sortedByDay[date] = 1;
            })

            return { files: sortedByDay, amount: files.length };
        } catch (error) {
            throw new ServerException("Erro na leitura dos arquivos");
        }
    }

    static async fetchAll () {
        try {
            const files = await readdir(path);

            return { files };
        } catch (error) {
            throw new ServerException("Erro na leitura dos arquivos");
        }
    }
}

module.exports = FileService;