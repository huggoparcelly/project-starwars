const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchApi = () => (
  fetch(ENDPOINT).then((response) => (
    response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
  ))
);

export default fetchApi;
