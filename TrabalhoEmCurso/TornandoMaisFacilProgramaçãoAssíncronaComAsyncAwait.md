# Tornando mais fácil a programação assíncrona com async e await

- [Anterior](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Promises)
- [Menu: Asynchronous](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous)
- [Próxima](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Choosing_the_right_approach)

Adições mais recentes à linguagem JavaScript são as [funções assíncronas](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function) e a palavra-chave `await`, adicionadas no ECMAScript 2017. Esses recursos atuam basicamente como um syntactic sugar em cima de promises, tornando o código assíncrono mais fácil de escrever e ler. Isso faz com que o código assíncrono pareça mais com o código síncrono old-school, então vale a pena aprender. Este artigo fornece o que você precisa saber.

| Pré-requisitos: | Conhecimento básico de informática, uma compreensão razoável dos fundamentos do JavaScript, uma compreensão de código assíncrono em geral e promises. |
| :-------------- | ------------------------------------------------------------ |
| Objetivo:       | Entender o uso do async/await.                               |

## [O básico de async/await](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#o_basico_de_async_await)

Existem duas formas de usar async/await no seu código.

### [A palavra-chave async](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#a_palavra_chave_async)

Em primeiro lugar, temos a palavra-chave `async`, que você coloca antes de uma declaração de função para transformá-la em uma função assíncrona. Uma [função assíncrona](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function) é uma função que espera a possibilidade de a palavra-chave await ser usada para invocar código assíncrono.

Experimente digitar as seguintes linhas no console JS do seu navegador.

```
function hello() { return "Hello" };
    hello();
```

Copy to Clipboard

Copiar para área de transferência

A funcão retorna "Hello" — nada de especial, certo?

Mas o que acontece se transformar-mos isso em uma função assíncrona? Tente o seguinte:

```
async function hello() { return "Hello" };
      hello();
```

Copy to Clipboard

Copiar para área de transferência

Ah. A invocação da função agora retorna uma promise. Isso é uma das características das funções assíncronas — seus valores de retorno são garantidos para serem convertidos em promises.

Você também pode criar uma [expressão de função assíncrona](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/async_function), assim:

```
let hello = async function() { return "Hello" };
      hello();
```

Copy to Clipboard

Copiar para área de transferência

E você pode usar arrow functions:

```
let hello = async () => { return "Hello" };
```

Copy to Clipboard

Copiar para área de transferência

Tudo isso faz basicamente a mesma coisa.

Para consumir o valor retornado quando a promise é finalizada, desde que esteja retornando uma promise, podemos usar um bloco `.then()`:

```
hello().then((value) => console.log(value))
```

Copy to Clipboard

Copiar para área de transferência

ou mesmo de forma simplificada

```
hello().then(console.log)
```

Copy to Clipboard

Copiar para área de transferência

Como vimos no último artigo.

Então a palavra-chave `async` é adicionada nas funções para dizer a elas para retornar uma promise ao invés de diretamente retornar uma valor.

### [A palavra-chave await](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#a_palavra_chave_await)

A vantagem de uma função assíncrona só se torna aparente quando você a combina com a palavra-chave [await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/await). `await` só funciona dentro de funções assíncronas no código JavaScript regular, no entanto, pode ser usado por conta própria com [JavaScript modules.](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules)

`await` pode ser colocado na frente de qualquer função assíncrona baseada em promise para pausar seu código nessa linha até que a promise seja resolvida e, em seguida, retornar o valor resultante.

Você pode usar `await` quando chamar qualquer função que retorne uma Promise, incluindo funções de API web.

Aqui está um exemplo comum:

```
async function hello() {
      return greeting = await Promise.resolve("Hello");
    };
    
    hello().then(alert);
```

Copy to Clipboard

Com certeza, o exemplo acima não é muito útil, porém serve para ilustrar a sintaxe. Vamos seguir em frente e ver um exemplo real.

## [Reescrevendo código baseado em promises com async/await](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#reescrevendo_codigo_baseado_em_promises_com_asyncawait)

Vejamos um exemplo simples de busca que vimos no artigo anterior:

```
fetch('coffee.jpg')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then(myBlob => {
      let objectURL = URL.createObjectURL(myBlob);
      let image = document.createElement('img');
      image.src = objectURL;
      document.body.appendChild(image);
    })
    .catch(e => {
      console.log('There has been a problem with your fetch operation: ' + e.message);
    });
```

Copy to Clipboard

Por enquanto, você precisa ter um entendimento razoável das promises e como elas funcionam, mas vamos converter isso para usar async/await e ver o quão simples as coisas se tornam:

```
async function myFetch() {
      let response = await fetch('coffee.jpg');
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      let myBlob = await response.blob();
    
      let objectURL = URL.createObjectURL(myBlob);
      let image = document.createElement('img');
      image.src = objectURL;
      document.body.appendChild(image);
    }
    
    myFetch()
    .catch(e => {
      console.log('There has been a problem with your fetch operation: ' + e.message);
    });
```

Copy to Clipboard

Isto faz o código muito mais simples and fácil de entender — sem mais blocos `.then()` em todo lugar!

Visto que a palavra-chave `async` transforma a funcão em uma promise, você pode refatorar seu código para usar uma abordagem de promises e await, trazendo a segunda metade da funcão para um novo bloco e torná-la mais flexível:

```
async function myFetch() {
      let response = await fetch('coffee.jpg');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.blob();
    
    }
    
    myFetch().then((blob) => {
      let objectURL = URL.createObjectURL(blob);
      let image = document.createElement('img');
      image.src = objectURL;
      document.body.appendChild(image);
    }).catch(e => console.log(e));
```

Copy to Clipboard

Você pode tentar fazer o exemplo sozinho, ou rodar o nosso [exemplo ao vivo](https://mdn.github.io/learning-area/javascript/asynchronous/async-await/simple-fetch-async-await.html) (veja também o[código-fonte](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/async-await/simple-fetch-async-await.html)).

### [Mas como isso funciona?](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#but_how_does_it_work)

Você notará que empacotamos o código dentro de uma função, e incluímos a palavra-chave `async` antes da palavra-chave`function`. Isso é necessário — você tem que criar uma função assíncrona para definir o bloco de código no qual você executará seu código assíncrono; como falamos mais cedo, `await` só funciona dentro de funções assíncronas.

Dentro da definição da função `myFetch()` você pode ver que o código se parece muito à versão anterior com promise, , mas tem algumas diferenças. Ao invés de precisar encadear um bloco `.then()` no final de cada método baseado em promise, você apenas adiciona a palavra-chave `await` antes de cada chamada de método, e então atribui o resultado a variável. A palavra-chave `await` faz com que o JavaScript pause seu código em tempo de execução nesta linha, não permitindo mais  nenhum código ser executado nesse meio tempo até que a chamada de função assíncrona retorne seu resultado — muito útil se o código subsequente depender desse resultado!

Assim que estiver completo, seu código continua a ser executado começando na próxima linha. Por exemplo:

```
let response = await fetch('coffee.jpg');
```

Copy to Clipboard

A resposta retornada pela promise `fetch()` preenchida é atribuída a variável `response` quando a resposta estiver disponível, e o parser pausa nesta linha até que isso ocorra. Uma vez que a resposta está disponível, o parser move para a próxima linha, o qual cria o `Blob` fora dele. Esta linha também invoca um método assíncrono baseado em promise, assim podemos usar `await` aqui também. Quando o resultado da operação retorna, retornamos isso fora da funcão `myFetch()`.

Isso significa que quando nós chamamos a função `myFetch()`, isso retorna uma promise, então podemos encadear um `.then()` no final, dentro do qual lidamos com a exibição do blob na tela.

Provavelmente você já está pensando "isso é realmente demais!", e você está certo — menos blocos `.then()` para envolver o código, e quase sempre se parece com um código síncrono, por isso é muito intuitivo.

### [Adicionando tratamento de erros](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#adding_error_handling)

E se você deseja adicionar tratamento de erros, você tem algumas opções.

Você pode usar uma estrutura `try...catch` síncrona com `async`/`await`. Este exemplo se expande da primeira versão do código que mostramos acima:

```
async function myFetch() {
      try {
        let response = await fetch('coffee.jpg');
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let myBlob = await response.blob();
        let objectURL = URL.createObjectURL(myBlob);
        let image = document.createElement('img');
        image.src = objectURL;
        document.body.appendChild(image);
    
      } catch(e) {
        console.log(e);
      }
    }
    
    myFetch();
```

Copy to Clipboard

Ao bloco `catch() {}` é passado um objeto de erro, qual nós chamamos `e`; agora podemos registrar isso no console, e isso nos fornecerá uma mensagem de erro detalhada mostrando onde o erro foi gerado no código.

Se você quiser usar a segunda versão (refatorada) do código que mostramos acima, seria melhor apenas continuar a abordagem híbrida e encadear um bloco `.catch()` no final da chamada `.then()`, dessa forma:

```
async function myFetch() {
      let response = await fetch('coffee.jpg');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.blob();
    
    }
    
    myFetch().then((blob) => {
      let objectURL = URL.createObjectURL(blob);
      let image = document.createElement('img');
      image.src = objectURL;
      document.body.appendChild(image);
    })
    .catch((e) =>
      console.log(e)
    );
```

Copy to Clipboard

Isso ocorre porque o bloco `.catch()` vai pegar os erros que ocorrem em ambos, na chamada de função com async e com cadeia de promises. Se você usou bloco `try`/`catch` aqui, você ainda pode obter erros não tratados na função `myFetch()` quando ela for chamada.

Você pode encontrar esses dois exemplos no GitHub:

- [simple-fetch-async-await-try-catch.html](https://mdn.github.io/learning-area/javascript/asynchronous/async-await/simple-fetch-async-await-try-catch.html) (veja [código-fonte](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/async-await/simple-fetch-async-await-try-catch.html))
- [simple-fetch-async-await-promise-catch.html](https://mdn.github.io/learning-area/javascript/asynchronous/async-await/simple-fetch-async-await-promise-catch.html) (veja [código-fonte](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/async-await/simple-fetch-async-await-promise-catch.html))

## [Esperando um Promise.all()](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#awaiting_a_promise.all)

async/await é construído em cima de [promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise), por isso é compatível com todos os recursos oferecidos por promises. Isso inclui `Promise.all()` — você pode esperar felizmente uma chamada `Promise.all()` para obter todos os resultados retornados em uma variável de uma forma que se pareça com um código síncrono simples. De novo, vamos voltar para [um exemplo que vimos em nosso artigo anterior](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/promises/promise-all.html). Mantenha-o aberto em uma guia separada para que você possa comparar e contrastar com a nova versão mostrada abaixo.

Convertendo este para async/await (veja [demonstração ao vivo](https://mdn.github.io/learning-area/javascript/asynchronous/async-await/promise-all-async-await.html) e [código-fonte](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/async-await/promise-all-async-await.html)), isso agora parece assim:

```
async function fetchAndDecode(url, type) {
      let response = await fetch(url);
    
      let content;
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        if(type === 'blob') {
          content = await response.blob();
        } else if(type === 'text') {
          content = await response.text();
        }
      }
    
      return content;
    
    
    }
    
    async function displayContent() {
      let coffee = fetchAndDecode('coffee.jpg', 'blob');
      let tea = fetchAndDecode('tea.jpg', 'blob');
      let description = fetchAndDecode('description.txt', 'text');
    
      let values = await Promise.all([coffee, tea, description]);
    
      let objectURL1 = URL.createObjectURL(values[0]);
      let objectURL2 = URL.createObjectURL(values[1]);
      let descText = values[2];
    
      let image1 = document.createElement('img');
      let image2 = document.createElement('img');
      image1.src = objectURL1;
      image2.src = objectURL2;
      document.body.appendChild(image1);
      document.body.appendChild(image2);
    
      let para = document.createElement('p');
      para.textContent = descText;
      document.body.appendChild(para);
    }
    
    displayContent()
    .catch((e) =>
      console.log(e)
    );
```

Copy to Clipboard

Você notará que a função `fetchAndDecode()` foi convertida facilmente em uma função assíncrona com apenas algumas alterações. Veja a linha do `Promise.all()`:

```
let values = await Promise.all([coffee, tea, description]);
```

Copy to Clipboard

Usando `await` aqui podemos obter todos os resultados das três promises retornadas no array `values`, quando todos eles estão disponíveis, de uma forma que se parece muito com o código síncrono. Tivemos que envolver todo o código em uma nova função assíncrona, `displayContent()`, e não reduzimos o código em muitas linhas, mas ser capaz de mover a maior parte do código para fora do bloco `.then()` fornece uma simplificação agradável e útil, deixando-nos com um programa muito mais legível.

Para tratamento de erros, nós incluímos um bloco `.catch()` no nossa chamada `displayContent()`; isso vai lidar com os erros que ocorrem em ambas as funções.

**Nota**: Também é possível usar um bloco `finally` síncrono na função assíncrona, no lugar de um bloco assíncrono`.finally()`, para mostrar um relatório final sobre como foi a operação — você pode ver isso em ação no nosso [exemplo ao vivo](https://mdn.github.io/learning-area/javascript/asynchronous/async-await/promise-finally-async-await.html) (veja também o [código-fonte](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/async-await/promise-finally-async-await.html)).

## [Tratando lentidão com async/await](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#handling_asyncawait_slowdown)

Async/await faz seu código parecer síncrono e, de certa forma, faz com que se comporte de maneira mais síncrona. A palavra-chave `await` bloqueia a execução de todo o código que o segue até que a promise seja cumprida, exatamente como faria com uma operação síncrona. Ele permite que outras tarefas continuem sendo executadas enquanto isso, mas o código com await é bloqueado. Por exemplo:

```
async function makeResult(items) {
      let newArr = [];
      for(let i=0; i < items.length; i++) {
        newArr.push('word_'+i);
      }
      return newArr;
    }
    
    async function getResult() {
      let result = await makeResult(items); // Blocked on this line
      useThatResult(result); // Will not be executed before makeResult() is done
    }
    
    
```

Copy to Clipboard

Como resultado, seu código pode ser retardado por um número significativo de promises aguardadas acontecendo uma após a outra. Cada `await` vai esperar que o anterior termine, ao passo que, na verdade, o que você pode querer é que as promises comecem a ser processadas simultaneamente, como fariam se não estivéssemos usando async/await.

Vejamos esses dois exemplos — [slow-async-await.html](https://mdn.github.io/learning-area/javascript/asynchronous/async-await/slow-async-await.html) (veja [código-fonte](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/async-await/slow-async-await.html)) e [fast-async-await.html](https://mdn.github.io/learning-area/javascript/asynchronous/async-await/fast-async-await.html) (veja [código-fonte](https://github.com/mdn/learning-area/blob/master/javascript/asynchronous/async-await/fast-async-await.html)). Ambos começam com uma função promise personalizada que simula um processo assíncrono com uma chamada `setTimeout()`:

```
function timeoutPromise(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve("done");
        }, interval);
      });
    };
```

Copy to Clipboard

Cada um deles inclui uma função assíncrona `timeTest()` que espera três chamadas `timeoutPromise()`:

```
async function timeTest() {
      ...
    }
```

Copy to Clipboard

Cada um termina registrando um horário de início, vendo quanto tempo a promise `timeTest()` leva para completar, em seguida, registrando um horário de término e relatando quanto tempo a operação levou no total:

```
let startTime = Date.now();
    timeTest().then(() => {
      let finishTime = Date.now();
      let timeTaken = finishTime - startTime;
      alert("Time taken in milliseconds: " + timeTaken);
    })
```

Copy to Clipboard

Isso é a função `timeTest()` que difere em cada caso.

No exemplo `slow-async-await.html`, `timeTest()` se parece com isso:

```
async function timeTest() {
      await timeoutPromise(3000);
      await timeoutPromise(3000);
      await timeoutPromise(3000);
    }
```

Copy to Clipboard

Aqui esperamos diretamente todas as três chamadas `timeoutPromise()`, fazendo cada uma a cada 3 segundos. Cada chamada subsequente é forçada a esperar até que a última termine — se você executar o primeiro exemplo, você verá a caixa de alerta relatando um tempo total de execução de cerca de 9 segundos.

No exemplo `fast-async-await.html`, `timeTest()` se parece com isso:

```
async function timeTest() {
      const timeoutPromise1 = timeoutPromise(3000);
      const timeoutPromise2 = timeoutPromise(3000);
      const timeoutPromise3 = timeoutPromise(3000);
    
      await timeoutPromise1;
      await timeoutPromise2;
      await timeoutPromise3;
    }
```

Copy to Clipboard

Aqui nós armazenamos os três objetos `Promise` em variáveis, que tem o efeito de desencadear seus processos associados, todos rodando simultaneamente.

A seguir, aguardamos seus resultados — porque todas as promises começaram a ser processadas essencialmente ao mesmo tempo, as promises serão cumpridas todas ao mesmo tempo; ao executar o segundo exemplo, você verá a caixa de alerta relatando um tempo total de execução de pouco mais de 3 segundos!

### [Tratamento de erros](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#handling_errors)

Há um problema com o padrão acima, no entanto — pode levar a erros não tratados.

Vamos atualizar os exemplos anteriores, desta vez adicionando uma promise rejeitada e uma declaração `catch` no final:

```
function timeoutPromiseResolve(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve("successful");
        }, interval);
      });
    };
    
    function timeoutPromiseReject(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          reject("error");
        }, interval);
      });
    };
    
    async function timeTest() {
      await timeoutPromiseResolve(5000);
      await timeoutPromiseReject(2000);
      await timeoutPromiseResolve(3000);
    }
    
    let startTime = Date.now();
    timeTest().then(() => {})
    .catch(e => {
      console.log(e);
      let finishTime = Date.now();
      let timeTaken = finishTime - startTime;
      alert("Time taken in milliseconds: " + timeTaken);
    })
```

Copy to Clipboard

No exemplo acima, o erro é tratado corretamente, e o alerta aparece após aproximadamente 7 segundos.

Agora no segundo padrão:

```
function timeoutPromiseResolve(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve("successful");
        }, interval);
      });
    };
    
    function timeoutPromiseReject(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          reject("error");
        }, interval);
      });
    };
    
    async function timeTest() {
      const timeoutPromiseResolve1 = timeoutPromiseResolve(5000);
      const timeoutPromiseReject2 = timeoutPromiseReject(2000);
      const timeoutPromiseResolve3 = timeoutPromiseResolve(3000);
    
      await timeoutPromiseResolve1;
      await timeoutPromiseReject2;
      await timeoutPromiseResolve3;
    }
    
    let startTime = Date.now();
    timeTest().then(() => {
    }).catch(e => {
      console.log(e);
      let finishTime = Date.now();
      let timeTaken = finishTime - startTime;
      alert("Time taken in milliseconds: " + timeTaken);
    })
```

Copy to Clipboard

Neste exemplo, temos um erro não tratado no console (depois de 2 segundos), e o alerta aparece após aproximadamente 5 segundos.

Para iniciar as promises em paralelo e detectar o erro corretamente, nós poderíamos usar `Promise.all()`, como discutido anteriormente:

```
function timeoutPromiseResolve(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve("successful");
        }, interval);
      });
    };
    
    function timeoutPromiseReject(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          reject("error");
        }, interval);
      });
    };
    
    async function timeTest() {
      const timeoutPromiseResolve1 = timeoutPromiseResolve(5000);
      const timeoutPromiseReject2 = timeoutPromiseReject(2000);
      const timeoutPromiseResolve3 = timeoutPromiseResolve(3000);
    
      const results = await Promise.all([timeoutPromiseResolve1, timeoutPromiseReject2, timeoutPromiseResolve3]);
      return results;
    }
    
    let startTime = Date.now();
    timeTest().then(() => {
    }).catch(e => {
      console.log(e);
      let finishTime = Date.now();
      let timeTaken = finishTime - startTime;
      alert("Time taken in milliseconds: " + timeTaken);
    })
```

Copy to Clipboard

Neste exemplo, o erro é tratado corretamente após aproximadamente 2 segundos e também vemos o alerta após aproximadamente 2 segundos.

A `Promise.all()` rejeita quando qualquer uma das promises de entrada é rejeitada. Se você deseja que todas as promises sejam cumpridas e, em seguida, usar alguns de seus valores retornados, mesmo quando alguns deles são rejeitados, você pode usar [`Promise.allSettled()`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled).

## [Async/await em métodos de classe](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#asyncawait_class_methods)

Como nota final, antes de prosseguirmos, você pode até adicionar `async` na frente de métodos de classe / objeto para fazê-los retornar promises, e `await` promises dentro deles. Dê uma olhada no artigo [Código de classe ES que vimos em nosso JavaScript orientado a objetos](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/Inheritance#ecmascript_2015_classes). em seguida, olhe para nossa versão modificada com um método `async`:

```
class Person {
      constructor(first, last, age, gender, interests) {
        this.name = {
          first,
          last
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
      }
    
      async greeting() {
        return await Promise.resolve(`Hi! I'm ${this.name.first}`);
      };
    
      farewell() {
        console.log(`${this.name.first} has left the building. Bye for now!`);
      };
    }
    
    let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);
```

Copy to Clipboard

O primeiro método da classe agora pode ser usado assim:

```
han.greeting().then(console.log);
```

Copy to Clipboard

## [Suporte de navegador](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#browser_support)

Uma consideração ao decidir se deve usar async/await é o suporte para navegadores mais antigos. Eles estão disponíveis em versões modernas da maioria dos navegadores, o mesmo que promises; os principais problemas de suporte vêm com o Internet Explorer e o Opera Mini.

Se você deseja usar async/await, mas está preocupado com o suporte a navegadores mais antigos, pode considerar o uso da biblioteca [BabelJS](https://babeljs.io/) — isso permite que você escreva seus aplicativos usando o JavaScript mais recente e deixe Babel descobrir quais mudanças, se houver, são necessárias para os navegadores de seu usuário. Ao encontrar um navegador que não suporta async/await, o polyfill do Babel pode fornecer automaticamente substitutos que funcionam em navegadores mais antigos.

## [Conclusão](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await#conclusao)

E aí está - async/await fornecem uma maneira agradável e simplificada de escrever código assíncrono que é mais simples de ler e manter. Mesmo com o suporte do navegador sendo mais limitado do que outros mecanismos de código assíncrono no momento da escrita, vale a pena aprender e considerar o uso, agora e no futuro.