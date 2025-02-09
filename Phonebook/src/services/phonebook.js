// Phonebook/src/services/phonebook.js
import axios from 'axios';
const baseUrl = 'http://localhost:3002/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = newPerson => {
  return axios.post(baseUrl, newPerson);
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

// Export all functions as a single object
export default { getAll, create, update };
