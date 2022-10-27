import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleVote }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const sortedAnecdotes = [...anecdotes].sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)

    const dispatch = useDispatch()
    
    const handleVote = (anecdote) => {
        dispatch(incrementVote(anecdote))
        dispatch(createNotification(`you voted ${anecdote.content}`))
        setTimeout(() => dispatch(removeNotification(null)), 5000)
    }
    
    return (
        <>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => handleVote(anecdote)}/>
            )}
        </>
    )
}

export default AnecdoteList