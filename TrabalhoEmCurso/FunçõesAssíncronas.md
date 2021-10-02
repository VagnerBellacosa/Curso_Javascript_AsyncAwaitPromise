# Funções assíncronas

A declaração `**async function**` define uma *função assíncrona*, que retorna um objeto [`AsyncFunction`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction).

Você também pode definir funções assíncronas usando uma [`expressão async function`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/async_function).

## [Sintaxe](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function#sintaxe)

```
async function nome([param[, param[, ... param]]]) {
   instruções
}
```

- `nome`

  O nome da função.

- `param`

  O nome de um parâmetro a ser passado para a função.

- `instruções`

  As instruções que compõem o corpo da função.

## [Descrição](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function#descrição)

Quando uma função assíncrona é chamada, ela retorna uma [`Promise`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise). Quando a função assíncrona retorna um valor, a `Promise` será resolvida com o valor retornado. Quando a função assíncrona lança uma exceção ou algum valor, a `Promise` será rejeitada com o valor lançado.

Uma função assíncrona pode conter uma expressão [`await`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/await), que pausa a execução da função assíncrona e espera pela resolução da `Promise `passada, e depois retoma a execução da função assíncrona e retorna o valor resolvido.

A proposta das funções `async/await` é de simplificar o uso de forma síncrona das `Promises` e executar alguns procedimentos em um grupo de `Promises`. Assim como `Promises` são similares a `callbacks` estruturados, funções `async/await` são similares à junção de `generators` com `P``romises`.

## [Exemplos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function#exemplos)

### [Exemplo simples](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function#exemplo_simples)

```
function resolverDepoisDe2Segundos(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function adicionar1(x) {
  var a = resolverDepoisDe2Segundos(20);
  var b = resolverDepoisDe2Segundos(30);
  return x + await a + await b;
}

adicionar1(10).then(v => {
  console.log(v);  // exibe 60 depois de 2 segundos.
});

async function adicionar2(x) {
  var a = await resolverDepoisDe2Segundos(20);
  var b = await resolverDepoisDe2Segundos(30);
  return x + a + b;
}

adicionar2(10).then(v => {
  console.log(v);  // exibe 60 depois de 4 segundos.
});
```

Copy to Clipboard

### [Reescrevendo uma cadeia de `Promise` com uma função `async`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function#reescrevendo_uma_cadeia_de_promise_com_uma_função_async)

Uma API que retorna uma [`Promise`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise) vai resultar em uma cadeia de `Promises` e separa a função em várias partes. Considere o seguinte código:

```
function pegarDadosProcessados(url) {
  return baixarDados(url) // retorna uma Promise
    .catch(e => {
      return baixarDadosReservas(url) // retorna uma Promise
    })
    .then(v => {
      return processarDadosNoWorker(v); // retorna uma Promise
    });
}
```

Copy to Clipboard

pode ser escrita em uma única função `async` desta forma:

```
async function pegarDadosProcessados(url) {
  let v;
  try {
    v = await baixarDados(url);
  } catch(e) {
    v = await baixarDadosReservas(url);
  }
  return processarDadosNoWorker(v);
}
```

Copy to Clipboard

Note que no exemplo acima não tem a instrução `await` na instrução do `return`, porque o valor retornado de uma função `async é `implícitamente passado por um [`Promise.resolve`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve).