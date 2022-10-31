import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import {
	AppBar,
	Toolbar,
	Button
} from '@mui/material'

const Menu = ({ user }) => {

	const dispatch = useDispatch()

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
	}

	return (
		<>
			<div style={{ marginBottom: 25 }}>
				<AppBar position="static">
					<Toolbar>
						<Button color="inherit" component={Link} to="/">
							blogs
						</Button>
						<Button color="inherit" component={Link} to="/users">
							users
						</Button>
						{user &&
							(
								<>
									<Button color="inherit" component={Link} to={`/users/${user.id}`}>
										Account
									</Button>
									<Button color="inherit" component={Link} onClick={() => handleLogout()}>
										logout
									</Button>
								</>
							)
						}
					</Toolbar>
				</AppBar>
			</div>
			{!user && <LoginForm />}
		</>
	)
}

export default Menu