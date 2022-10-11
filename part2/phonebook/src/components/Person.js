import personService from '../services/persons'

const Person = ({ persons, setPersons }) => {

    const handleDelete = (person) => {

        if (window.confirm(`Delete ${person['name']}?`)) {
            personService
                .remove(person['id'])
                .then(() => {
                    setPersons(persons.filter(oldPerson => oldPerson['id'] !== person['id']))
                })
        }
    }

    return (
        <div>
            {persons.map(person => {
                return (
                    <div>
                        <p>{person['name']} {person['number']}</p>
                        <button onClick={() => handleDelete(person)}>delete</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Person