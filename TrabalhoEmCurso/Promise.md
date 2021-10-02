# Promise

**`Promise`** é um objeto usado para processamento assíncrono. Um `Promise` (*de "promessa"*) representa um valor que pode estar disponível agora, no futuro ou nunca.

**Nota:** Esse artigo descreve o construtor `Promise,`os métodos e propriedades de tais objetos. Para aprender sobre como promises funcionam e como utilizá-los, é aconselhavel a leitura de [utilizando promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises). O construtor é utilizado para embrulhar funções sem suporte ao conceito "promise".

## [Descrição](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#descrição)

Uma `**Promise**` representa um proxy para um valor que não é necessariamente conhecido quando a promessa é criada. Isso permite a associação de métodos de tratamento para eventos da ação assíncrona num caso eventual de sucesso ou de falha. Isto permite que métodos assíncronos retornem valores como métodos síncronos: ao invés do valor final, o método assíncrono retorna uma *promessa* ao valor em algum momento no futuro.

Um **`Promise`** está em um destes estados: 

- *pending (*pendente*)*: Estado inicial, que não foi realizada nem rejeitada.
- *fulfilled (*realizada): sucesso na operação.
- *rejected (*rejeitado):  falha na operação.

Uma promessa pendente pode se tornar *realizada* com um valor ou *rejeitada* por um motivo (erro). Quando um desses estados ocorre, o método `then` do `Promise` é chamado, e ele chama o método de tratamento associado ao estado (`rejected` ou `resolved`). Se a promessa foi realizada ou rejeitada quando o método de tratamento correspondente for associado, o método será chamado, deste forma não há uma condição de competição entre uma operação assíncrona e seus manipuladores que estão sendo associados.

Como os métodos `Promise.prototype.then` e `Promise.prototype.catch` retornam promises, eles podem ser encadeados — uma operação chamada *composição*.

![img](https://mdn.mozillademos.org/files/8633/promises.png)

## [Propriedades](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#propriedades)

- `Promise.length`

  Propriedade length cujo valor é sempre 1 (número de argumentos do método construtor).

- [`Promise.prototype` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

  Representa o protótipo para o método construtor da `Promise`.

## [Métodos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#métodos)

- [`Promise.all(lista)`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

  Retorna uma promise que é resolvida quando todas as promises no argumento *lista* forem resolvidas ou rejeitada assim que uma das promises da lista for rejeitada. Se a promise retornada for resolvida, ela é resolvida com um array dos valores das promises resolvidas da lista. Se a promise for rejeitada, ela é rejeitada com o motivo da primeira promise que foi rejeitada na lista. Este método pode ser útil para agregar resultados de múltiplas promises.

- [`Promise.race(lista)`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

  Retorna uma promise que resolve ou rejeita assim que uma das promises do argumento lista resolve ou rejeita, com um valor ou o motivo daquela promise.

- [`Promise.reject(motivo)`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

  Retorna um objeto `Promise` que foi rejeitado por um dado motivo.

- [`Promise.resolve(valor)`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

  Retorna um objeto `Promise` que foi resolvido com um dado valor. Se o valor é `thenable` (possui um método `then`), a promise retornada "seguirá" este método, adotando esse estado eventual; caso contrário a promise retornada será realizada com o valor. Geralmente, se você quer saber se um valor é uma promise ou não, utilize [`Promise.resolve(valor)`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) e trabalhe com a valor de retorno que é sempre uma promise.

## [Protótipo Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#protótipo_promise)

### [Propriedades](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#propriedades_2)

{{page('pt-BR/Web/JavaScript/Reference/Global_Objects/Promise/prototype','Propriedades')}}

### [Métodos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#métodos_2)

{{page('pt-BR/Web/JavaScript/Reference/Global_Objects/Promise/prototype','Métodos')}}

## [Exemplos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#exemplos)

### [Criando uma Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#criando_uma_promise)

<div id="log"></div>

Este pequeno exemplo mostra o mecanismo de uma `Promise`. O método `testPromise()` é chamado cada vez que [``](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/button) é clicado. Isso cria uma promise que resolverá, usando [`window.setTimeout()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout), o contador de promise `promiseCount` (iniciando em 1) a cada 1 a 3s randomicamente. O construtor `Promise()` é usado para criar a promise.

A realização da promise é simplesmente registrada, por meio de configuração na função callback de realização  usando [`p1.then()`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/then). Alguns logs mostram como a parte síncrona do método é desacoplada da conclusão assíncrona da promise.

```
var promiseCount = 0;
function testPromise() {
  var thisPromiseCount = ++promiseCount;

  var log = document.getElementById('log');
  log.insertAdjacentHTML('beforeend', thisPromiseCount +
      ') Started (<small>Sync code started</small>)<br/>');

  // Criamos uma nova promise: prometemos a contagem dessa promise (após aguardar 3s)
  var p1 = new Promise(
    // a função resolve() é chamada com a capacidade para resolver ou
    // rejeitar a promise
    function(resolve, reject) {
      log.insertAdjacentHTML('beforeend', thisPromiseCount +
          ') Promise started (<small>Async code started</small>)<br/>');
      // Isto é apenas um exemplo para criar assincronismo
      window.setTimeout(
        function() {
          // Cumprimos a promessa !
          resolve(thisPromiseCount)
        }, Math.random() * 2000 + 1000);
    });

  // definimos o que fazer quando a promise for realizada
  p1.then(
    // apenas logamos a mensagem e o valor
    function(val) {
      log.insertAdjacentHTML('beforeend', val +
          ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
    });

  log.insertAdjacentHTML('beforeend', thisPromiseCount +
      ') Promise made (<small>Sync code terminated</small>)<br/>');
}
```

Copy to Clipboard

```
if ("Promise" in window) {
  btn = document.getElementById("btn");
   btn.addEventListener("click",testPromise);
}
else {
  log = document.getElementById('log');
  log.innerHTML = "Live example not available as your browser doesn't support the Promise interface.";
}
```

Copy to Clipboard

Este exemplo é executado pelo click do botão. Você precisa de uma versão de navegedor com suporte a `Promise`. Clicando algumas vezes no botão num curto intervalo de tempo, você verá as diferentes promises sendo realizadas uma após a outra.



### [Carregando uma imagem com XHR](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise#carregando_uma_imagem_com_xhr)

Outro simples exemplo usando `Promise` e `XMLHTTPRequest` para carregar imagens está disponível no repositório GitHub MDN[ promise-test](https://github.com/mdn/js-examples/blob/master/promises-test/index.html). Você também pode [vê-lo em ação](https://mdn.github.io/js-examples/promises-test/). Cada passo é comentado e lhe permite acompanhar de perto a arquitetura de Promise e XHR.