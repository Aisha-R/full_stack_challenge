import { useState } from 'react'

const Person = ({ person }) => {
    return <p>{person['name']} {person['number']}</p>
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '00000000000' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleForm = (event) => {
        event.preventDefault()

        const found = persons.map(person => person['name'] === newName)
        
        const duplicate = found.includes(true)
        
        if (!duplicate) {

            const newPerson = { 'name': newName, 'number': newNumber }
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
    
    return (
        <div>
            <h2>Phonebook</h2>
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
                <Person key={ person['name'] } person={ person }/>
            )}
        </div>
    )
}

export default App