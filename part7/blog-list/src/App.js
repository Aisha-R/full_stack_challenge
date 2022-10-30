import { /*useState,*/ useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { /*login,*/ setUser } from './reducers/loginReducer'
import { /*login,*/ initializeUsers } from './reducers/userReducer'/*
import { initializeBlogs, newBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'*/
import Notification from './components/Notification'/*
import Togglable from './components/Togglable'*/

const Users = () => {

	const user = useSelector(({ user }) => user)
	const users = useSelector(({ users }) => users)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
		}
	}, [])

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
	}

	return (
		<div>
			<h2>blogs</h2>
			{user &&
				<>
					<p>{user.name} logged in</p>
					<button onClick={() => handleLogout()}>logout</button>
				</>
			}
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<td></td>
						<td>blogs created</td>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
	/*
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const user = useSelector(({ user }) => user)
	const blogs = useSelector(({ blogs }) => [...blogs].sort((b1, b2) => b2.likes - b1.likes))

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
		}
	}, [])

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

	const addBlog = async (returnedBlog) => {
		try {
			dispatch(newBlog(returnedBlog))
			dispatch(
				createNotification(
					`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
					5
				)
			)
		} catch (error) {
			console.log(error)
			dispatch(createNotification(error.response.data.error, 5))
		}
	}

	const handleLike = async (blog) => {
		dispatch(updateBlog(blog))
	}

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog))
		}
	}
	*/
	return (
		<div>
			<Routes>
				<Route path='/users' element={<Users />} />
			</Routes>
			<Notification />{/* }
			<div>
				{user === null ? (
					<LoginForm
						handleLogin={handleLogin}
						username={username}
						password={password}
						handleUsernameChange={({ target }) =>
							setUsername(target.value)
						}
						handlePasswordChange={({ target }) =>
							setPassword(target.value)
						}
					/>
				) : (
					<div>
						<p>{user.name} logged-in</p>
						<button onClick={() => handleLogout()}>Log Out</button>
						<div>
							<Togglable buttonLabel="new blog">
								<BlogForm addBlog={addBlog} />
							</Togglable>
						</div>
					</div>
				)}
			</div>
			<h2>blogs</h2>
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					handleLike={handleLike}
					handleDelete={handleDelete}
				/>
			))}{*/ }
		</div>
	)
}

export default App
