const ServerException = require("../utils/ServerException");
const DataframeService = require("./DataframeService");

class ThesaurusService {
    static async fill (filename) {
        try {
            let dataframe = await DataframeService.joinColumns(filename);
            console.log(dataframe.toString())
            return dataframe;
        } catch (error) {
            throw new ServerException("Erro no preenchimento do thesaurus", 500)
        }
    }
}

module.exports = ThesaurusService;