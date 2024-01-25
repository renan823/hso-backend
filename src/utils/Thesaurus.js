const cytoscape = require("cytoscape");

class Thesaurus {
    constructor () {
        this.content = cytoscape()
    }

    getEdgeId (word, synonym) {
        let words = [word, synonym].sort();
        
        return words.join("-");
    }

    addWord (word) {
        const node = this.content.getElementById(word);

        if (node.empty()) {
            this.content.add({ group: "nodes", data: { id: word } });
        } 
    }
}

module.exports = Thesaurus;