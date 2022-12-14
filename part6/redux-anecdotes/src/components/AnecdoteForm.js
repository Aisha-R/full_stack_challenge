import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.newAnecdote(content)
        props.setNotification(`you voted ${content}`, 5)
    } 

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type="submit">create</button>
            </form>
        </>)
}

const mapDispatchToProps = {
    newAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)
    (AnecdoteForm)

export default ConnectedAnecdoteForm