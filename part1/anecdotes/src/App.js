import { useState } from 'react'

const Heading = ({text}) => {
    return (
        <>
            <h2>{text}</h2>
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    
    const getRandomInt = (max) => Math.floor(Math.random() * max)
    
    const handleSelection = () => setSelected(getRandomInt(anecdotes.length))

    const [points, setPoints] = useState([])
   
    const handleVote = () => {
        setPoints(points.concat(selected))
    }

    const selectedVotes = () => {
        let count = 0

        points.forEach(value => {
            if (value === selected) count = count + 1
        })
        
        return count
    }

    const max = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }

    let maxVotes = 0

    const mostVote = () => {
        points.forEach((value) => max[value] = max[value] + 1)

        let value = 0;
        let position = 0;
        
        for (const property in max) {
            if (max[property] > value) {
                value = max[property]
                position = property
            }
        }
        maxVotes = value

        return position
    }

    return (
        <div>
            <Heading text="Anecdote of the day" />
            <p>{anecdotes[selected]}</p>
            <p>has {selectedVotes()} votes</p>
            <button onClick={() => handleVote()}>vote</button>
            <button onClick={() => handleSelection()}>next anecdote</button>
            <Heading text="Anecdote with most votes" />
            <p>{anecdotes[mostVote()]}</p>
            <p>has {maxVotes} votes</p>
        </div>
    )
}

export default App