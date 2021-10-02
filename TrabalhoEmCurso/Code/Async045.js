async function getPerson(id) {
  const response = await fetch(`http://swapi.co/api/people/${id}`);
  return await response.json();
}