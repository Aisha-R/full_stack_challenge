const Language = ({ language }) => {
    return <><li>{language}</li></>
}

const Single = ({ result }) => {
    
    const languages = []

    const obj = result['languages']

    for (const key in obj) {
        languages.push(obj[key])
    }

    return (
        <div>
            <h3>{result['name']['official']}</h3>
            <p>capital {result['capital']}</p>
            <p>area {result['area']}</p>
            <p>languages:</p>
            <ul>
                {languages.map(language =>
                    <Language key={language} language={language} />
                )}
            </ul>
            <img src={result['flags']['png']} alt={result['name']['common']} />

        </div>
    )
}

export default Single