import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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

    const anecdotes = useSelector(state => state.sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes))
    const dispatch = useDispatch()

    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => dispatch(addVote(anecdote.id)) }/>
            )}
        </>
    )
}

export default AnecdoteList