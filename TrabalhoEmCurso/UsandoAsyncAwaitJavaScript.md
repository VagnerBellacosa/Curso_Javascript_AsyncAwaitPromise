**[Javascript](https://www.treinaweb.com.br/blog/categoria/javascript)**

# Usando o Async / Await do JavaScript

Conheça a funcionalidade async / await do JavaScript que nos ajuda a trabalhar com códigos assíncronos como se estivéssemos escrevendo de forma síncrona.

 mais de 4 anos atrás

[Artigos](https://www.treinaweb.com.br/blog)Usando o Async / Await do JavaScript

Olá, Web Developers!

Vamos falar hoje sobre a possibilidade de criar funções assíncronas e como trabalhar com elas de forma bem simples com as novas instruções `async` e `await` do JavaScript.

Vamos imaginar a seguinte situação:

Copiar

```js
function func1(number){
    return new Promise(resolve =>{
        setTimeout(() => resolve(77 + number) , 1000)
    })
}

function func2(number){
    return new Promise(resolve =>{
        setTimeout(() => resolve(22 + number) , 1000)
    })
}

function func3(number){
    return new Promise(resolve =>{
        setTimeout(() => resolve(14 * number) , 1000)
    })
}

// Usando as funções
func1(4)
   .then(number => {
        console.log('Hello');
        return func2(number);
   })
   .then(number => {
        console.log('World');
        return func3(number);
   })
   .then(result => console.log(result))
```

Usar essas funções assíncronas com Promises nos poupam do *“Callback Hell”*, mas mesmo assim, precisamos passar uma função de Callback para cada `then()`.

Com `async` e `await` podemos trabalhar com código assíncrono em um estilo mais parecido com o bom e velho código síncrono. Vamos reescrever o exemplo anterior, partindo da parte onde consumimos as nossas três funções assíncronas:

Copiar

```js
async function myAsyncFunction(){
    var number = await func1(4);

    console.log('Hello');
    number = await func2(number);

    console.log('World');
    var result = await func3(number);

    console.log(result);
}
```

Primeiro de tudo, temos o comando `async`. Ele faz com que uma função automaticamente retorne uma *Promise*. Então:

Copiar

```js
// retorna o número 5
function example1(){
    return 5;
}

// retorna uma Promise com o valor 5
function example2(){
    return Promise.resolve(5);
}

// faz exatamente o mesmo que a função "example2()"
async function example3(){
    return 5;
}
```

Depois, dentro de `myAsyncFunction()`, veja que usamos o comando `await` antes de chamar as funções que retornam *Promises*:

Copiar

```js
async function myAsyncFunction(){  
   var number = await func1(4);
```

Veja que, ao invés de usar o `then()` com uma função de callback, nós simplesmente estamos jogando o retorno da função em uma variável, como fazemos com códigos síncronos.

O comando `await` basicamente pausa a função `myAsyncFunction()` até que a Promise dentro da função `func1()` seja resolvida. Então o valor retornado é atribuído à variável e o código de `myAsyncFunction()` continua de onde parou.

**Lembre-se:** o comando `await` só pode ser executado dentro de uma função marcada como `async`. Por isso que para executar as funções eu criei a função `myAsyncFunction()`.

Como estamos falando de funções assíncronas, não pense que essa “pausa” que o `await` causa irá travar o seu código todo. Lembre-se que essa é só uma nova sintaxe para se trabalhar com *Promises*. Então, quando o `await` pausar a sua função, outras funções poderão estar sendo executadas.



![JavaScript Intermediário](https://d2knvm16wkt3ia.cloudfront.net/assets/svg-icon/javascript.svg)

##### CursoJavaScript Intermediário

[Conhecer o curso](https://www.treinaweb.com.br/curso/javascript-intermediario)

## Devo usar Async / Await ao invés de then()?

Isso vai depender muito da situação. Muitos desenvolvedores vão pelo gosto, outros definem um padrão único a se seguir para o projeto e outros decidem o que é melhor para cada caso.

Em meus projetos eu prefiro usar o que irá permitir uma melhor leitura e entendimento do código. No exemplo lá em cima, vimos um caso em que usar as funções com `await` deixou o código mais legível do que ficar criando vários `then()` (apesar de sempre atribuir o valor na mesma variável).

Vamos a um exemplo em que o `then()` pode deixar nosso código mais legível:

Copiar

```js
function example1(){  
    return func1(4)
        .then(func2)
        .then(func3);
}

async function example2(){  
    var number = await func1(4);
    number = await func2(number);
    number = await func3(number);
    return number;
}

// ou
async function example3(){  
    return func3(await func2(await func1(4)))
}
```

O `example2()` e `example3()` usam o `async/await`. Veja que, nesse caso que só encadeamos funções, o uso do `then()` em `example1()` acaba sendo bem mais simples que `example2()` e mais legível que `example3()`.

Sem contar que o comando `await` só funciona dentro de uma função `async`. Se estivermos dentro de uma função que não é `async`, teríamos que criar uma função async apenas para poder executar o comando `await`, enquanto as *Promises* podem ser usadas em qualquer lugar.

## Concluindo

Async / Await aumentam as nossas possibilidades, mas também temos que analisar quando é o melhor momento para utilizá-los.

Os navegadores modernos e o Node.js já dão um bom suporte para eles, então, aproveite (com moderação)! ;)