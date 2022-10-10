import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
    return <p>{person['name']} {person['number']}</p>
}

const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person['id']} person={person} />
            )}
        </div>
    )
}

const PersonForm = ({ handleForm, newName, handleNameInput, newNumber, handleNumberInput }) => {
    return (
        <div>
            <form onSubmit={handleForm}>
                <div>
                    name: <input value={newName} onChange={handleNameInput} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberInput} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

const Result = ({ searchResult }) => {
    return <p>{searchResult['name']} {searchResult['number']}</p>
}

const Filter = ({ handleSearch, searchResults }) => {
    return (
        <div>
            <h2>search</h2>
            <input onChange={handleSearch} />
            {searchResults.map(searchResult =>
                <Result key={searchResult['id']} searchResult={searchResult} />
            )}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleForm = (event) => {
        event.preventDefault()

        const found = persons.map(person => person['name'] === newName)
        
        const duplicate = found.includes(true)
        
        if (!duplicate) {

            const newPerson = { id: persons.length + 1,name: newName, number: newNumber }
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')

        } else {

            setNewName('')
            setNewNumber('')
            alert(`${newName} is already added to phonebook`)
        }
    }

    const handleNameInput = (event) => setNewName(event.target.value)
    const handleNumberInput = (event) => setNewNumber(event.target.value)

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase()
   
        if (searchTerm.length > 0 && searchTerm !== " ") {
            setSearchResults(persons.filter(person => person['name'].toLowerCase().includes(searchTerm)))
            
        } else {
            setSearchResults([])
        }
        
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons').then(response => {
                setPersons(response.data)
            })
    }, [])
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleSearch={ handleSearch }  searchResults={ searchResults } />
            <h2>add a new</h2>
            <PersonForm handleForm={ handleForm } newName={ newName } handleNameInput={ handleNameInput } newNumber={ newNumber } handleNumberInput={ handleNumberInput }/>
            <h2>Numbers</h2>
            <Persons persons={ persons } />
        </div>
    )
}

export default App