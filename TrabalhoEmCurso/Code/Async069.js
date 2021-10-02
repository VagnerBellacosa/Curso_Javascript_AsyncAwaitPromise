async function pegarDadosProcessados(url) {
  let v;
  try {
    v = await baixarDados(url);
  } catch(e) {
    v = await baixarDadosReservas(url);
  }
  return processarDadosNoWorker(v);
}


