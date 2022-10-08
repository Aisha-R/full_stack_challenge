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

const Statistic = ({ measure, calculation }) => <p>{measure} {calculation}</p>

const Statistics = ({ measure, calculation }) => {
    return (
        <div>
            <Statistic measure={measure[0]} calculation={calculation[0]} />
            <Statistic measure={measure[1]} calculation={calculation[1]} />
            <Statistic measure={measure[2]} calculation={calculation[2]} />
        </div>
    )
}

const History = ({ text, result, measure, calculation }) => {
    
    if (calculation[0] === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    } 
    
    return (
        <div>
            <Feedbacks text={text} result={result} />
            <Statistics measure={measure} calculation={calculation} />
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

    const all = () => good + neutral + bad
    const average = () => (good - bad) / all()
    const positive = () => good / all() * 100
   
    return (
        <div>
            <Header text="give feedback" />
            <Buttons text={[goodText, neutralText, badText]} handleClick={[() => setGood(good + 1), () => setNeutral(neutral + 1), () => setBad(bad + 1)]}/>
            <Header text="statistics" />
            <History text={[goodText, neutralText, badText]} result={[good, neutral, bad]} measure={["all", "average", "positive"]} calculation={[all(), average(), positive()]} />
        </div>
    )
}

export default App
