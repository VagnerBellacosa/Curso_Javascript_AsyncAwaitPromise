async function concurrent () {
  var [r1, r2, r3] = await* [p1, p2, p3];
}