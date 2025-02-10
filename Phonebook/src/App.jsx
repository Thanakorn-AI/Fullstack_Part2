// Phonebook/src/App.jsx
import React, { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

// Notification component with inline styling
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div style={{
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }}>
      {message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');  // New state for handling phone numbers
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phonebookService.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        phonebookService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(response => {
            setPersons(persons.map(p => p.id === existingPerson.id ? response.data : p));
            setNotification(`Updated ${newName}'s number`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => console.error('Error updating person:', error));
      }
    } else {
      phonebookService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNotification(`Added ${newName} to the Phonebook`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => console.error('Error adding person:', error));
    }
};

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          alert(`The information of ${name} was already removed from the server.`);
          setPersons(persons.filter(p => p.id !== id)); // Optionally refresh list if not found
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Add a new contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
