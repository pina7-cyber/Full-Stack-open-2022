import personService from "./services/persons";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import AddNote from "./components/AddNote";
import ErrorNote from "./components/ErrorNote";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [term, setTerm] = useState("");
  const [addMessage, setAddMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  const filterHandler = (event) => {
    setTerm(event.target.value);
  };

  const nameInputHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberInputHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const deleteHandlerOfId = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const array = persons.filter((person) => person.name === newName);
        const dude = array[0];
        personService
          .update(dude.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== dude.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${dude.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== dude.id));
          });
      } else {
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setAddMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setAddMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <AddNote message={addMessage} />
      <ErrorNote message={errorMessage} />
      <Filter term={term} filterHandler={filterHandler} />
      <h3>add a new</h3>
      <PersonForm
        submitHandler={submitHandler}
        newName={newName}
        newNumber={newNumber}
        nameInputHandler={nameInputHandler}
        numberInputHandler={numberInputHandler}
      />
      <h3>Numbers</h3>
      <>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(term.toLowerCase())
          )
          .map((pick) => (
            <Person
              key={pick.id}
              name={pick.name}
              number={pick.number}
              deleteHandler={() => deleteHandlerOfId(pick.id, pick.name)}
            />
          ))}
      </>
    </div>
  );
};

export default App;
