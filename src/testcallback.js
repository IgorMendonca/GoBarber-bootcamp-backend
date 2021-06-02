const valorinteiro = 1000;
let valormetade;

calcula(valorinteiro, (result) => {
  valormetade = result;
  console.log(valormetade);
});

function calcula(valorinteiro, callback) {
  const divisao = valorinteiro / 2;
  return callback(divisao);
}
