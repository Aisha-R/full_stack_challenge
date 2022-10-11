import { useState } from 'react'

import Single from './Single'

const Each = ({ result, handleButton }) => {

    return (
        <div>
            <p>{result['name']['common']}</p>
            <button onClick={event => handleButton(event, result)}>show</button>
        </div>
    )
}

const Multiple = ({ results }) => {

    const [singleView, setSingleView] = useState(false)
    const [single, setSingle] = useState({})

    const handleButton = (event, result) => {
        setSingle(result)
        setSingleView(true)
    }

    if (singleView) {
        return <Single result={single} />
    } else {
        return (
            <div>
                {results.map(result => <Each key={result['cca2']} result={result} handleButton={handleButton} />)}
            </div>
        )
    }
}

export default Multiple