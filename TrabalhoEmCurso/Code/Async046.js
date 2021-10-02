async function getPerson(id) {
  throw Error('Not found');
}

getPerson(0)
  .catch(err => console.error(err.message)); // Not found