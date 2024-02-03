const dfd = require("danfojs-node");
const stringSimilarity = require("string-similarity");

// Função para calcular a similaridade entre duas palavras
function calcularSimilaridade(palavra1, palavra2) {
  return stringSimilarity.compareTwoStrings(palavra1, palavra2);
}

// Função para agrupar palavras similares em uma lista
function agruparPalavrasSimilares(dataFrame) {
  const grupos = {};

  dataFrame.columns.forEach(coluna => {
    const palavras = dataFrame.column(coluna).unique().values

    palavras.forEach((palavra1, index1) => {
      grupos[palavra1] = grupos[palavra1] || [];

      palavras.forEach((palavra2, index2) => {
        if (index1 !== index2) {
          const similaridade = calcularSimilaridade(palavra1, palavra2);

          if (similaridade > 0.7) { // Ajuste o limiar de similaridade conforme necessário
            grupos[palavra1].push(palavra2);
          }
        }
      });
    });
  });

  return grupos;
}

// Criar DataFrame de exemplo com múltiplas colunas
const df = new dfd.DataFrame({
  Nome: ['gato', 'cachorro', 'gatta', 'cachorrinho', 'peixe', "gato"],
  Cor: ['preto', 'marrom', 'branco', 'amarelo', 'laranja', "azul"]
});

df.columns.forEach(column => {
    const words = df.column(column).unique().values
})

// Agrupar palavras similares em todas as colunas
const gruposSimilares = agruparPalavrasSimilares(df);

console.log("Grupos de palavras similares:");
console.log(gruposSimilares);
