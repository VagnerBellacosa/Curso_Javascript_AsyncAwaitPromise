function pegarDadosProcessados(url) {
  return baixarDados(url) // retorna uma Promise
    .catch(e => {
      return baixarDadosReservas(url) // retorna uma Promise
    })
    .then(v => {
      return processarDadosNoWorker(v); // retorna uma Promise
    });
}