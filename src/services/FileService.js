const allowedExtensions = require("../utils/allowedExtensions");
const { readdir, writeFile } = require("fs/promises");

const path = "./uploads/";

class FileService {

    static async upload (file) {

        if (file) {
            const filename = new Date().toISOString().split(".")[0];

            let size = file.name.split(".").length;
            const extension = file.name.split(".")[size-1];

            if (!allowedExtensions.includes(extension)) {
                return { message: "Extensão de arquivo inválida", status: 415 };
            }

            const bytes = await file.arrayBuffer();

            const buffer = Buffer.from(bytes);

            await writeFile(`${path}${filename}.${extension}`, buffer);

            return { message: "Arquivo salvo", status: 201 };
        } else {
            return { message: "Nenhum arquivo enviado", status: 400 };
        }
    }

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

            return { files: sortedByDay, amount: files.length, status: 200 };
        } catch (error) {
            return { message: "Erro na leitura dos arquivos", status: 500 };
        }
    }

    static async fetchAll () {
        try {
            const files = await readdir(path);

            return { files, status: 200 };
        } catch (error) {
            return { message: "Erro na leitura dos arquivos", status: 500 };
        }
    }
}

module.exports = FileService;