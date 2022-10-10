import { useState, useEffect } from 'react'
import axios from 'axios'

import Single from './components/Single'
import Search from './components/Search'

const App = () => {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    const handleSearch = (event) => setSearch(event.target.value)

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all').then(response => {
                if (search.length > 0) {

                    const matches = response.data.filter(result => result['name']['common'].toLowerCase().includes(search.toLowerCase()))
                    setResults(matches)

                } else {
                    setResults([])
                }
            })
    }, [search])

    if (results.length > 10) {

        return (
            <div>
                <Search handleSearch={handleSearch} />
                <p>Too many matches, specify another filter</p>
            </div>
        )

    } else if (results.length > 1) {

        return (
            <div>
                <Search handleSearch={handleSearch} />
                {results.map(result => <p key={result['name']['official']}>{result['name']['common']}</p>)}
            </div>
        )

    } else if (results.length === 1) {

        return (
            <div>
                <Search handleSearch={handleSearch} />
                <Single result={results[0]} />
            </div>
        )

    } else {

        return (
            <div>
                <Search handleSearch={handleSearch} />
                <p>No search results</p>
            </div>
        )
    }
}

export default App