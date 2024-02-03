const { PrismaClient } = require("@prisma/client");
const ServerException = require("../utils/ServerException");
const DataframeService = require("./DataframeService");

class ThesaurusService {

    static prisma = new PrismaClient();

    static async fill (filename) {
        try {
            console.log("(akncsdcsd")
            let dataframe = await DataframeService.joinColumns(filename);
            console.log(dataframe.toString())
            return dataframe;
        } catch (error) {
            throw new ServerException("Erro no preenchimento do thesaurus", 500)
        }
    }

    static async addWord (word) {
        const exists = await this.prisma.words.findFirst({ text: word });

        if (!exists || exists === []) {
            await this.prisma.words.create({ data: { text: word } });
        }
    }

    static async removeWord (word) {
        await this.prisma.synonyms.deleteMany({ 
            where: { 
                OR: [
                    { word1: word },
                    { word2: word }
                ]
            }
        })

        await this.prisma.words.delete({ where: { text: word } });
    }

    static async createSynonym (words) {
        let id = words.sort().join("-");

        const exists = await this.prisma.words.findMany({ where: { id } });

        if (exists.length === 2) {
            words = words.sort();
            await this.prisma.synonyms.create({ data: { id, word1: words[0], word2: words[1] } });
        }
    }

    static async deleteSynonym (words) {
        let id = words.sort().join("-");

        await this.prisma.synonyms.deleteMany({ where: { id } });
    }
}

module.exports = ThesaurusService;