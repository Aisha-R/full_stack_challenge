import { useState } from 'react'

const Person = ({ person }) => {
    return <p>{person['name']} {person['number']}</p>
}

const Result = ({ searchResult }) => {
    return <p>{searchResult['name']} {searchResult['number']}</p>
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
    
    return (
        <div>
            <h2>Phonebook</h2>
            <h2>search</h2>
            <input onChange={ handleSearch }/>
            <h2>add a new</h2>
            {searchResults.map(searchResult =>
                <Result key={ searchResult['id'] } searchResult={ searchResult } />
            )}
            <form onSubmit={ handleForm }>
                <div>
                    name: <input value={ newName } onChange={ handleNameInput }/>
                </div>
                <div>
                    number: <input value={ newNumber } onChange={ handleNumberInput } />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person =>
                <Person key={ person['id'] } person={ person }/>
            )}
        </div>
    )
}

export default App