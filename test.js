const dfd = require("danfojs-node")

const df = new dfd.DataFrame({
    A: [1, 2, 3],
    B: [4, 5, 6],
    C: [7, 8, 9]
});

const words = df.values

words.forEach(word => console.log(word))