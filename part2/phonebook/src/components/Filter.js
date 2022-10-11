const Filter = ({ searchResults, persons, setSearchResults }) => {

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
            <h2>search</h2>
            <input onChange={handleSearch} />
            {searchResults.map(searchResult =>
                <p key={searchResult['id']}>{searchResult['name']} {searchResult['number']}</p>
            )}
        </div>
    )
}

export default Filter