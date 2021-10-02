function spawn (genF, self) {
  return new Promise(function (resolve, reject) {
    var gen = genF.call(self);
    step(() => gen.next(undefined));
    function step (nextF) {
      var next;
      try {
        next = nextF();
      } catch(e) {
        // finished with failure, reject the promise
        reject(e);
        return;
      }
      if (next.done) {
        // finished with success, resolve the promise
        resolve(next.value);
        return;
      }
      // not finished, chain off the yielded promise and `step` again
      Promise.resolve(next.value).then(
        v => step(() => gen.next(v)),
        e => step(() => gen.throw(e))
      );
    }
  });
}


