async function timeTest() {
      const timeoutPromise1 = timeoutPromise(3000);
      const timeoutPromise2 = timeoutPromise(3000);
      const timeoutPromise3 = timeoutPromise(3000);
    
      await timeoutPromise1;
      await timeoutPromise2;
      await timeoutPromise3;
    }