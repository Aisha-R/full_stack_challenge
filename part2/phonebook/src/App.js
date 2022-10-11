import { useState, useEffect } from 'react'

import personService from './services/persons'

import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        personService
            .getAll()
            .then(all => {
                setPersons(all)
            })
    }, [])
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchResults={searchResults} persons={persons} setSearchResults={setSearchResults}/>
            <h2>add a new</h2>
            <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <Person persons={persons} setPersons={setPersons} />
        </div>
    )
}

export default App