import { useSelector, useDispatch } from 'react-redux'

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const App = () => {
    const anecdotes = useSelector(state => state.sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes))
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id))
    }

    const addAnecdote = (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch({
            type: 'NEW_ANECDOTE',
            data: {
                content,
                votes: 0,
                id: generateId()
            }
        })
    }

    const addVote = (id) => {
        return {
            type: 'INCREMENT',
            data: id
        }
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
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App