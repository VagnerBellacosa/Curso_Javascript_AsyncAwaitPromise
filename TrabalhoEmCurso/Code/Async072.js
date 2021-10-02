function getRandomPonyFooArticle (gen) {
  var g = gen();
  request('https://ponyfoo.com/articles/random', (err, res, body) => {
    if (err) {
      g.throw(err); return;
    }
    g.next(body);
  });
}

getRandomPonyFooArticle(function* printRandomArticle () {
  var html = yield;
  var md = hget(html, {
    markdown: true,
    root: 'main',
    ignore: '.at-subscribe,.mm-comments,.de-sidebar'
  });
  var txt = marked(md, {
    renderer: new Term()
  });
  console.log(txt);
});
