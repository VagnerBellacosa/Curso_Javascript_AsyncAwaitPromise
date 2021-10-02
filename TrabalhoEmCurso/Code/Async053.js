const fetch = require('node-fetch');

// arrow function
const getPerson = async (id) => {
  const response = await fetch(`http://swapi.co/api/people/${id}`);
  return await response.json();
};

getPerson(1)
  .then(person => console.log(person.name));