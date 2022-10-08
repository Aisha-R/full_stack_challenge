import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Buttons = ({ text, handleClick }) => {
    return (
        <div>
            <Button text={text[0]} handleClick={handleClick[0]} />
            <Button text={text[1]} handleClick={handleClick[1]} />
            <Button text={text[2]} handleClick={handleClick[2]} />
        </div>
    )
}

const Feedback = ({text, result}) => <p>{text} {result}</p>

const Feedbacks = ({ text, result }) => {
    return (
        <div>
            <Feedback text={text[0]} result={result[0]} />
            <Feedback text={text[1]} result={result[1]} />
            <Feedback text={text[2]} result={result[2]} />
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodText = "good"
    const neutralText = "neutral"
    const badText = "bad"

    return (
        <div>
            <Header text="give feedback" />
            <Buttons text={[goodText, neutralText, badText]} handleClick={[() => setGood(good + 1), () => setNeutral(neutral + 1), () => setBad(bad + 1)]}/>
            <Header text="statistics" />
            <Feedbacks text={[goodText, neutralText, badText]} result={[good, neutral, bad]} />
        </div>
    )
}

export default App
