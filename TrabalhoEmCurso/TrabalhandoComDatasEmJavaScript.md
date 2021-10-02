# Trabalhando com datas em JavaScript

![Felipe Nascimento](https://www.gravatar.com/avatar/2fcbe0bb5c7376a9c9b1cefaf11b4655.png?r=PG&size=200x200&date=2021-10-02&d=https%3A%2F%2Fcursos.alura.com.br%2Fassets%2Fimages%2Fforum%2Favatar_f.png)

Felipe Nascimento

03/01/2019

COMPARTILHE

- 
- 
- 
- 

[![img](https://www.alura.com.br/assets/api/formacoes/categorias/front-end.svg)Esse artigo faz parte daFormação Front-end](https://www.alura.com.br/formacao-front-end)

Uma floricultura me pediu pra criar uma funcionalidade em que **a cor de fundo do site mudasse de acordo com as horas do dia**. Vamos ver como podemos encontrar as horas do dia e **alterar o CSS** tudo isso usando JavaScript.

### Trabalhando com datas e horas

O **JavaScript** possui a classe `Date` que nos permite trabalhar com datas e horários. Se chamarmos o construtor `Date` sem parâmetros:

```
const horas = new Date();
console.log( horas );
```

Conseguimos obter a data e o horário atual:

```
Thu Nov 01 2018 13:51:03 GMT-0300 (Brasília Standard Time)
```

Ótimo, resolvemos uma pequena parte do problema que era descobrir como pegar a data e hora, agora vamos tentar ser mais específico e encontrar somentes as horas do dia.

### Encontrando as horas

Como `Date` é um classe, ela possui um método para nos auxiliar a encontrar as horas como o método `.getUTCHours()`

```
const hoje = new Date();
console.log( hoje.getUTCHours() );
```

Conseguimos ser bem específicos e encontrar as somente as horas, o problema foi que o número que tivemos de retorno foi 15 e no dia em eu rodei esse código eram exatas 13:00 horas, logo o retorno deveria ter sido 13 e não 15. O que ocorreu ?

### Resolvendo o problema das horas

Conseguimos pegar a hora do dia, mas ela está vindo errada!. O problema da hora encontrada não ser a hora real aconteceu por que o método `getUTCHours()`está trazendo a hora UTC (**Tempo Universal Coordenado)** Para resolver essa situação vamos utilizar o método `getHours` da classe `Date`

```
const horas = new Date();
console.log( horas.getHours() );
```

Ambos os métodos trazem apenas as horas, a diferença é que `getHours()` retorna o horário local.

No momento em que eu rodei o script a hora retornada foi `13` , Uma parte do problema foi resolvido, agora vamos ver como alterar a cor do fundo do site usando JavaScript.

### Alterando as cores de acordo com as horas

Atualmente a cor de fundo do site é amarelo, o que eu quero é deixar ele azul a partir das 16:00. Com o JavaScript nós conseguimos alterar a cor do fundo da página utilizando os seletores CSS.

```
const conteudo = document.querySelector(".cordefundo");
conteudo.style.background = "#fed02e";
```

### Alterando CSS com JavaScript

Agora que já sabemos como pegar a hora do dia, e como alterar a cor de fundo de uma página, vamos criar um script com a ajuda do `if` para fazer a mudança de horário

```
const now = new Date;
const tempo = now.getHours();

if( tempo < 16 ) {

    const conteudo = document.querySelector(".container");

    conteudo.style.background = "#fed02e";

 } else {

    const conteudo = document.querySelector(".container");

    conteudo.style.background = "#1000ff";
}
```

### Para saber mais

Além de invocar o construtor sem parâmetro, existem outras maneiras para encontrar data e hora usando o objeto `Date`

Passando o valor da data em milisegundos. De acordo com a documentação do [developer mozilla](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date), a **data do JavaScript** é baseada no valor de tempo em milissegundos desde a meia noite de [01 de Janeiro de 1970, UTC](https://pt.wikipedia.org/wiki/Era_Unix).

Com um dia correspondendo a 86.400,000 milissegundos.( essa parte é do texto da mozilla)

```
const horas = new Date(5000000000000);
console.log( horas );
```

Obtemos como resposta:

```
2128-06-11T08:53:20.000Z
```

Passando dia, mês e ano como parâmetro, lembrando que, nessa notação, o mês de janeiro é o 0:

```
const horas = new Date(2015,10,1);
console.log( horas );
```

Obtemos como resposta:

```
2015-11-01T02:00:00.000Z
```

Passando como parâmetro do construtor uma string:

```
const horas = new Date("2015/10/1");
console.log( horas );
```

Obtemos como resposta:

```
2015-10-01T03:00:00.000Z
```

## Métodos e funções úteis em JavaScript

É importante conhecer bem as funções básicas do JavaScript, como o [replace e outros métodos da String](https://www.alura.com.br/artigos/javascript-replace-manipulando-strings-e-regex), [conversão de String para número](https://www.alura.com.br/artigos/convertendo-string-para-numero-em-javascript) e a [formação de números em JavaScript](https://www.alura.com.br/artigos/formatando-numeros-no-javascript).

Se ficou interessado em como o Javascript funciona e como você pode utilizá-lo melhor, aqui na Alura temos uma [**formação front-end**](https://cursos.alura.com.br/formacao-front-end). Nela, você verá como programar em Javascript, utilizar expressões regulares, entre outras coisas.