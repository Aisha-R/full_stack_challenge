const Filter = ({ searchResults, persons, setSearchResults }) => {

    const handleSearch = (event) => {
        const searchTerm = event.target.value.trim()
        
        if (searchTerm.length > 0) {
            setSearchResults(persons.filter(person => person['name'].toLowerCase().includes(searchTerm.toLowerCase())))

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