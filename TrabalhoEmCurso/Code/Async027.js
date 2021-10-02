async function fetchAndDecode(url, type) {
      let response = await fetch(url);
    
      let content;
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        if(type === 'blob') {
          content = await response.blob();
        } else if(type === 'text') {
          content = await response.text();
        }
      }
    
      return content;
    
    
    }
    
    async function displayContent() {
      let coffee = fetchAndDecode('coffee.jpg', 'blob');
      let tea = fetchAndDecode('tea.jpg', 'blob');
      let description = fetchAndDecode('description.txt', 'text');
    
      let values = await Promise.all([coffee, tea, description]);
    
      let objectURL1 = URL.createObjectURL(values[0]);
      let objectURL2 = URL.createObjectURL(values[1]);
      let descText = values[2];
    
      let image1 = document.createElement('img');
      let image2 = document.createElement('img');
      image1.src = objectURL1;
      image2.src = objectURL2;
      document.body.appendChild(image1);
      document.body.appendChild(image2);
    
      let para = document.createElement('p');
      para.textContent = descText;
      document.body.appendChild(para);
    }
    
    displayContent()
    .catch((e) =>
      console.log(e)
    );