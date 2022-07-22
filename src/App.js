import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  function handleFilterChange(e) {
    setFilter(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    let existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson._id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person._id === returnedPerson._id ? returnedPerson : person
              )
            );
          });
      }
    } else {
      let newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((res) => {
        setPersons((prevPersons) => {
          return [...prevPersons, res];
        });
        setNewName("");
        setNewNumber("");
      });
    }
  }

  function deletePersonHandler(id) {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person._id === id).name}?`
      )
    )
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person._id !== id)));
  }

  const peopleToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter))
    : persons;

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} deletePerson={deletePersonHandler} />
    </div>
  );
};

export default App;
