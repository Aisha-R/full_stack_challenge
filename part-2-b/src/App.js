import { useState } from 'react'

const Person = ({ person }) => {
    return <p>{ person['name'] }</p>
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleForm = (event) => {
        event.preventDefault()
        const newPerson = { 'name': newName }
        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    const handleInput = (event) => setNewName(event.target.value)
    
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={ handleForm }>
                <div>
                    name: <input value={ newName } onChange={ handleInput }/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person =>
                <Person key={person['name']} person={ person }/>
            )}
        </div>
    )
}

export default App