# Como funciona o import e export do JavaScript?

![Exemplo de import e export](https://lh5.googleusercontent.com/q6BOVGn8NhJcRToGCOOslLdjOY4-cIbbZDTLjx3mpqvYurobu7LoTdaa1kVAZbFQmIS8yu9nuf6wDSVRBCy51gZ1uxeD7xIr05cnAdSUw1RIVZwIPnkQLGtv0antzVzqr2knd92o)

![Mario Souto](https://www.gravatar.com/avatar/7c0b1603881b4593063f34a26cd58966.png?r=PG&size=200x200&date=2021-10-02&d=https%3A%2F%2Fcursos.alura.com.br%2Fassets%2Fimages%2Fforum%2Favatar_m.png)

Mario Souto

23/04/2020

COMPARTILHE

- 
- 
- 
- 

[![img](https://www.alura.com.br/assets/api/formacoes/categorias/front-end.svg)Esse artigo faz parte daFormação Front-end](https://www.alura.com.br/formacao-front-end)

Dando aulas de JavaScript, Angular e React eu vejo que essa dúvida é muito frequente tanto em quem ta começando com JavaScript quanto com pessoas que já trabalham com a linguagem mas nunca exploraram o recurso, então bora ver como usar isso no dia a dia!

![Exemplo de import e export](https://lh5.googleusercontent.com/q6BOVGn8NhJcRToGCOOslLdjOY4-cIbbZDTLjx3mpqvYurobu7LoTdaa1kVAZbFQmIS8yu9nuf6wDSVRBCy51gZ1uxeD7xIr05cnAdSUw1RIVZwIPnkQLGtv0antzVzqr2knd92o)

Aproveitando aqui pra avisar que recentemente eu comecei a fazer vídeos com explicações mais gerais de JavaScript como essa no meu canal do YouTube, [Dev Soutinho](https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA/featured), e aproveito pra deixar o convite aqui com um tutorial implementando o map e o forEach :)

<iframe src="https://www.youtube.com/embed/JbzcLKiTThk" class="cosmos-elasticMedia" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen="" style="box-sizing: inherit; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; width: 544px; height: 304px; border: 0px;"></iframe>

Na imagem acima a gente já consegue visualizar um pouco do que eu vou explicar aqui. Mas antes, é importante dizer em JavaScript, **cada arquivo é considerado como um módulo** e todas as variáveis e funções que ele possui só são acessíveis dentro dele, a menos que você explicitamente as exporte.

> No navegador você precisa usar a tag script com type="module" para usar os recursos aqui exemplificados, se estiver usando algum framework não precisa se procupar e [no NodeJS o suporte já está disponível](https://nodejs.org/api/esm.html) :). Lembrando que a MDN possui toda a referência sobre esse assunto: [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import), e [`export`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)

### O caso mais comum: `export default`

No caso abaixo, sempre que criarmos um arquivo (módulo), e quisermos exportar algum dado dele para acessar em outro, vamos fazer um código bem similar com o exemplo abaixo:

```
// ## ex01/moduloA.js

const variavel = 'Valor';
const variavel2 = 'Outro Valor';

export default variavel;
// ## ex01/moduloB.js

import Modulo;

console.log(Modulo); // => 'Valor'
```

É importante reforçar que nesse caso a `variavel2` **não está disponível** como um valor acessível em `ex01/moduloB.js`

> Repare também que na hora de importar, não precisamos passar o nome `variavel`, o nome é um apelido (ou alias) e você pode escolher o que fizer mais sentido dentro do contexto da importação, lembrando que, é uma boa prática fazer o import com o nome do arquivo na maioria das vezes, ficando algo como moduloA.

```
// ## ex01/moduloB.js

import ModuloA;

console.log(ModuloA); // => 'Valor'
```

### Como exportar multiplos valores de um arquivo?

A primeira opção, em cima do que vimos anteriormente é exportar um objeto com os dados que queremos acessar em outro arquivo:

```
// ## ex01/moduloA.js

const variavel = 'Valor';
const variavel2 = 'Outro Valor';

export default {
   variavel: variavel,
   variavel2: variavel2,
};
// ## ex01/moduloB.js

import Modulo;

console.log(Modulo); // { variavel: 'Valor', variavel2: 'Outro Valor' }
```

Uma forma alternativa a que vimos agora é fazer na hora que declaramos uma variável ou função, colocar um `export` atrás, como no exemplo abaixo:

```
// ## ex01/moduloA.js

export const variavel = 'Valor';
export const variavel2 = 'Outro Valor';
// ## ex01/moduloB.js

import { variavel, variavel2 };

console.log(variavel, ' e ' ,variavel2); // 'Valor e Outro Valor'
```

Repare que agora, não estamos mais utilizando o `import Modulo` e sim fazendo um [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring), e acessando cada valor individualmente, poderiamos também fazer o import como `import * as Modulo`, assim cada valor que exportamos seria agrupado dentro de um módulo.

### Da pra misturar tudo?

Sim! Você consegue, basta se baseaer no exemplo abaixo:

```
// ## ex01/moduloA.js

export const variavel = 'Valor';
export const variavel2 = 'Outro Valor';

export default 'Valor default do módulo';
// ## ex01/moduloB.js

import ValorDoModulo, { variavel, variavel2 };

console.log(variavel, ' e ' ,variavel2); // 'Valor e Outro Valor'
console.log(ValorDoModulo); // Valor default do módulo'
```

### O que vimos até aqui?

O import e export são bem flexíveis e caso você conheça mais algum caso e queira compartilhar comigo, deixo o espaço aberto no [meu twitter](https://twitter.com/omariosouto).

Espero que esse post tenha ti ajudado e caso você queira mais dicas de JavaScript, deixo a dica para seguir [meu canal no YouTube], onde semanalmente estou lançando vídeos de JavaScript puro, React e React Native, CSS e Jogos.

E deixo aqui de novo a dica para ver meu vídeo explicando as diferenças do forEach e do map implementando ambos.