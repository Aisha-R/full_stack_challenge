import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import LoginForm from '../components/LoginForm'

const LoginHandler = ({ user }) => {

	const dispatch = useDispatch()

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
	}

	return (
		<div>
			{user === null ? (
				<LoginForm	/>
			) : (
				<div>
					<p>{user.name} logged-in</p>
					<button onClick={() => handleLogout()}>Log Out</button>
				</div>
			)}
		</div>
	)
}

export default LoginHandler