import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital, weather }) => {
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>temperature {weather['main']['temp']} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather['weather'][0]['icon']}@2x.png`} alt="Weather Icon" />
            <p>wind {weather['wind']['speed']} m/s</p>
        </div>
    )
}

const Information = ({ result }) => {

    const languages = []

    const obj = result['languages']

    for (const key in obj) {
        languages.push(obj[key])
    }

    return (
        <>
            <h2>{result['name']['official']}</h2>
            <p>capital {result['capital']}</p>
            <p>area {result['area']}</p>
            <p>language(s):</p>
            <ul>
                {languages.map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={result['flags']['png']} alt={result['name']['common']} />
        </>
    )
}

const Single = ({ result }) => {

    const [weather, setWeather] = useState({})
    
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const lat = result['latlng'][0]
        const lon = result['latlng'][1]
        
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
            .then(response => {
                setWeather(response['data'])
                
            }).catch(error => {
                console.log(error)
            })
    })

    const show = Object.keys(weather).length > 0
   
        return (
            <div>
                <Information result={result}/>
                {show ? <Weather capital={result['capital']} weather={weather}/> : <p>Weather data is unavailable</p>}
            </div>
        )
}

export default Single