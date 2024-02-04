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

            let dates = [];

            const sortedByDay = {};

            files.forEach((file) => {
                const [year, month, day] = file.split("T")[0].split("-");

                let date = `${day}/${month}/${year}`;

                if (!dates.includes(date)) {
                    dates.push(date);
                }

                sortedByDay.hasOwnProperty(date) ?  sortedByDay[date] += 1 : sortedByDay[date] = 1;
            })

            const lastTenDays = {};

            dates = dates.reverse();
            
            for (let i = 0; i <= 10; i++) {
                if (i >= dates.length) {
                    break;
                }

                let date = dates[i];
                lastTenDays[date] = sortedByDay[date];
            }

            return { files: lastTenDays, amount: files.length };
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

    static extensions = allowedExtensions;
}

module.exports = FileService;