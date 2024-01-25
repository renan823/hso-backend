const DataframeService = require("./DataframeService");

class ThesaurusService {
    static async fill (filename) {
        let dataframe = await DataframeService.joinColumns(filename);

        return
    }
}

module.exports = ThesaurusService;