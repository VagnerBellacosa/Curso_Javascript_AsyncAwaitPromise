const fetch = require('node-fetch');

async function getPerson(id) {...}

async function loadPerson(id) {
  try {
    const person = await getPerson(id);
    console.log(person.name);

  } catch (err) {
    console.error(err.message);
  }
}

loadPerson(0);
loadPerson(1);