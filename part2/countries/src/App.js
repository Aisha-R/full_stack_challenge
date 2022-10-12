import { useState, useEffect } from 'react'
import axios from 'axios'

import Multiple from './components/Multiple'
import Single from './components/Single'
import Search from './components/Search'

const App = () => {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

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
                <Search setSearch={setSearch} />
                <p>Too many matches, specify another filter</p>
            </div>
        )

    } else if (results.length > 1) {

        return (
            <div>
                <Search setSearch={setSearch} />
                <Multiple results={results} />
            </div>
        )

    } else if (results.length === 1) {

        return (
            <div>
                <Search setSearch={setSearch} />
                <Single result={results[0]} />
            </div>
        )

    } else {

        return (
            <div>
                <Search setSearch={setSearch} />
                <p>Type to see results</p>
            </div>
        )
    }
}

export default App