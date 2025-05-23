import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personsService from './services/persons'

//import axios from 'axios';

const App = () => {
  /* const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])  */ 

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newTel, setNewTel] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const nameInputControl = (event) => {
    setNewName(event.target.value);
  }

  const telInputControl = (event) => {
    setNewTel(event.target.value);
  }
  
  const searchInputControl = (event) => {
    setNewSearch(event.target.value);
    personToShow();
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newTel
    }    
    
    if(addPersonControl(newName)) {
      
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(personObject));
          setNewName('');
          setNewTel('');
          setError(false);
          notification(`Added ${personObject.name}`)
          personsService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
        })
        .catch(error => {
          notification(error.response.data.error, true)
        })
      
    } else {
      const actualPerson = persons.filter(persona => persona.name === newName);
      
      let text = `${actualPerson[0].name} is already added to phonebook, replace the old number witch a new one?`; 
      if(confirm(text) === true) {  

        personsService
        .update(actualPerson[0].id, personObject)
        .then(changePerson => {
          personsService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
              setNewName('');
              setNewTel('');
              setError(false);
              notification(`${personObject.name} update`)
            })
        })
        .catch(error => {
          console.log('Entrada catch');
          
          setError(true);
          setMessage(
            `Person '${actualPerson[0].name}' was already removed from server`
          )
          setTimeout(() => {
            setMessage(null);
            setError(false);
          }, 5000)
          setPersons(persons.filter(p => p.id !== actualPerson[0].id))
          setNewName('');
          setNewTel('');
        })
        
      }
    }
    
  }


  const addPersonControl = (name) => {
    
    if(persons.map(persona => persona.name).indexOf(name) === -1) {
      return true;
    } else {
      return false;
    }
  }

  const eliminarPerson = (actualPerson) => {
    console.log('eliminarPerson: Clicat', actualPerson);
    
    let text = `Delete ${actualPerson.name}`; 
    if(confirm(text) === true) {
      personsService
      .eliminar(actualPerson.id)
      .then(returnedPersons => {
        setError(false);
        notification(`${actualPerson.name} removed successfully`)
        personsService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
      })
      .catch(error => {
        console.log('Entrada catch');
        
        setError(true);
        setMessage(
          `Person '${actualPerson.name}' was already removed from server`
        )
        setTimeout(() => {
          setMessage(null);
          setError(false);
        }, 5000)
        setPersons(persons.filter(p => p.id !== actualPerson.id))
      })
    }
    
  }

  const notification = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000)
  }

  const personToShow = () => (newSearch === '')
  ? persons
  : persons.filter(persona => persona.name.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>  
      <Notification message={message} error={error}/>
      <Filter onChange={searchInputControl} value={newSearch}/>
      <div>
        <h2>add a new</h2>
      </div>
      <PersonForm onChangeName={nameInputControl} onChangeTel={telInputControl} valueName={newName} valueTel={newTel} onClick={addPerson}/>
      <h2>Numbers</h2>
      <Persons personToShow={personToShow()} onClickDelete={eliminarPerson} />
    </div>
  )
}

export default App