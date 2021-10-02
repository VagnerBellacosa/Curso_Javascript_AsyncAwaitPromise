// Promise
fetch(`http://swapi.co/api/people/${id}`)
  .then(response => response.json())
  .then(person => console.log(person.name));

// async/await
const response = await fetch(`http://swapi.co/api/people/${id}`);
const person = await response.json();
console.log(person.name);