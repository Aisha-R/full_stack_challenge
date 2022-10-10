const Search = ({ handleSearch }) => {
    return (
        <>
            <label>find countries</label>
            <input onChange={handleSearch} />
        </>
    )
}

export default Search