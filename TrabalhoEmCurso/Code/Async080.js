async function example (a, b, c) {
  example function body
}

function example (a, b, c) {
  return spawn(function* () {
    example function body
  }, this);
}