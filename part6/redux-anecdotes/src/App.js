import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService
            .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App