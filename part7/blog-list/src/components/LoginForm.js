import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'
import {
	TextField,
	Button
} from '@mui/material'

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
					<TextField
						label="username"
						id="username"
						value={username}
						name="Username"
						onChange={({ target }) =>
							setUsername(target.value)}
					/>
				</div>
				<div>
					<TextField
						label="password"
						type='password'
						id="password"
						value={password}
						name="Password"
						onChange={({ target }) =>
							setPassword(target.value)}
					/>
				</div>
				<div>
					<Button id="login-button" variant="contained" color="primary" type="submit">
						login
					</Button>
				</div>
			</form>
		</>
	)
}

export default LoginForm
