function timeoutPromise(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          resolve("done");
        }, interval);
      });
    };