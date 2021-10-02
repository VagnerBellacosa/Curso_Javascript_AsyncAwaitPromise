let startTime = Date.now();
    timeTest().then(() => {
      let finishTime = Date.now();
      let timeTaken = finishTime - startTime;
      alert("Time taken in milliseconds: " + timeTaken);
    })