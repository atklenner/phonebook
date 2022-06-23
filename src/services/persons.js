import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

function getAll() {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
}

function create(person) {
  const req = axios.post(baseUrl, person);
  return req.then((res) => res.data);
}

export default { getAll, create };
