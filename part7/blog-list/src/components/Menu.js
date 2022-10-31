import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Menu = ({ user }) => {

	const dispatch = useDispatch()

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
	}

	const padding = {
		padding: 5
	}

	const loginStyle = {
		paddingTop: 20,
		backgroundColor: 'white'
	}

	return (
		<div style={{ backgroundColor: 'lightGrey' } }>
			<Link style={padding} to="/">blogs</Link>
			<Link style={padding} to="/users">users</Link>
			{user === null ? (
				<div style={loginStyle}>
					<LoginForm />
				</div>
			) : (
				<>
					{user.name} logged-in
					<Link style={padding}>
						<button style={padding} onClick={() => handleLogout()}>Log Out</button>
					</Link>
				</>
			)}
		</div>
	)
}

export default Menu