async function concurrent () {
  var [r1, r2, r3] = await Promise.all([p1, p2, p3]);
}