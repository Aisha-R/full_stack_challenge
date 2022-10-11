const Search = ({ setSearch }) => {

    const handleSearch = (event) => setSearch(event.target.value)

    return (
        <>
            <label>find countries</label>
            <input onChange={handleSearch} />
        </>
    )
}

export default Search