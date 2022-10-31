import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'

const LoginForm = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			dispatch(login({ username, password }))
		} catch (error) {
			dispatch(createNotification(error.response.data.error, 5))
		}

		setUsername('')
		setPassword('')
	}

	return (
		<>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						id="username"
						value={username}
						name="Username"
						onChange={({ target }) =>
							setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						id="password"
						value={password}
						name="Password"
						onChange={({ target }) =>
							setPassword(target.value)}
					/>
				</div>
				<button type="submit" id="login-button">
					login
				</button>
			</form>
		</>
	)
}

export default LoginForm
