const all = Promise.all.bind(Promise);
async function concurrent () {
  var [r1, r2, r3] = await all([p1, p2, p3]);
}