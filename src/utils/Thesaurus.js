const cytoscape = require("cytoscape");
const ThesaurusService = require("../services/ThesaurusService");
const similarity = require("string-similarity")

class Thesaurus {
    constructor () {
        this.content = cytoscape();
        this.weight = 0.3
    }

    getSimilarity (words) {
        return similarity.compareTwoStrings(words[0], words[1]);
    }

    getEdgeId (words) {
        words = words.sort();
        
        return words.join("-");
    }

    addWord (word) {
        word = word.toLowerCase();

        const node = this.content.getElementById(word);

        if (node.empty()) {
            this.content.add({ group: "nodes", data: { id: word } });
        } 
    }

    addEdge (source, target) {
        let id = this.getEdgeId([source, target]);
        let edge = this.content.getElementById(id);

        if (edge.empty()) {
            this.content.add({ group: "edges", data: { source: source, target: target }, id });
        } 
    }

    addSynonym (words) {
        this.addWord(words[0])
        this.addWord(words[1]);
        this.addEdge(words[0], words[1])
    }
    

    fill (dataframe) {
        dataframe.columns.forEach(column => {
            const words = dataframe.column(column).unique().values;

            words.forEach((word) => {
                if (word && word.trim().lenght !== 0) {
                    this.addWord(word);

                    words.forEach((item) => {
                        if (item && item !== word && item.trim().lenght !== 0) {
                            
                            if (this.getSimilarity([item, word]) >= this.weight) {
                                this.addSynonym([item, word]);
                            }
                        }
                    })
                }
            })
        })
        console.log("done")
    }
}

module.exports = Thesaurus;