import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage, setError }) => {

    const handleNameInput = (event) => setNewName(event.target.value)
    const handleNumberInput = (event) => setNewNumber(event.target.value)

    const handleForm = (event) => {
        event.preventDefault()

        const found = persons.find(person => person['name'] === newName)

        const newPerson = { name: newName, number: newNumber }

        if (!found) {

            personService
                .create(newPerson)
                .then(createdPerson => {

                    setError(false)
                    setMessage(`'${createdPerson['name']}' has been added to your contacts`)

                    setTimeout(() => {
                        setMessage(null)
                        }, 5000)

                    setPersons(persons.concat(createdPerson))
                    setNewName('')
                    setNewNumber('')    
                })
                .catch(error => {
                    
                    setError(true)
                    setMessage(error.response.data.error)

                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })

        } else {

            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

                personService
                    .update(found['id'], newPerson)
                    .then(updated => {
                        setPersons(persons.map(person => person['id'] !== updated['id'] ? person : updated))
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        setError(true)
                        setMessage(error.response.data.error)

                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)

                        personService
                            .getAll()
                            .then(all => {
                                setPersons(all)
                            })
                    })
            }
        }
    }

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

export default PersonForm