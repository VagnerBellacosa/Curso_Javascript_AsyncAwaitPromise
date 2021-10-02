var hget = require('hget');
var marked = require('marked');
var Term = require('marked-terminal');

printRandomArticle();

function printRandomArticle () {
  getRandomPonyFooArticle()
    .then(html => hget(html, {
      markdown: true,
      root: 'main',
      ignore: '.at-subscribe,.mm-comments,.de-sidebar'
    }))
    .then(md => marked(md, {
      renderer: new Term()
    }))
    .then(txt => console.log(txt))
    .catch(reason => console.error(reason));
}