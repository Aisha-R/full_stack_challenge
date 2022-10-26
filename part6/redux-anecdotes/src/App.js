import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
    const anecdotes = useSelector(state => state.sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes))
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id))
    }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App