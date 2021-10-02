async function makeResult(items) {
      let newArr = [];
      for(let i=0; i < items.length; i++) {
        newArr.push('word_'+i);
      }
      return newArr;
    }
    
    async function getResult() {
      let result = await makeResult(items); // Blocked on this line
      useThatResult(result); // Will not be executed before makeResult() is done
    }
    