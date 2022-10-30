import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, newBlog } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	//const [likes, setLikes] = useState(false)

	const blogs = useSelector(({ blogs }) => blogs)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])
	/*
	useEffect(() => {
		const sorted = [...blogs].sort((b1, b2) => b2.likes - b1.likes)

		setBlogs(sorted)
	}, [likes])
	*/
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })

			window.localStorage.setItem(
				'loggedBlogappUser',
				JSON.stringify(user)
			)

			blogService.setToken(user.token)

			setUser(user)
		} catch (error) {
			dispatch(createNotification(error.response.data.error, 5))
		}

		setUsername('')
		setPassword('')
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
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
	/*
	const handleLike = async (blog) => {
		const response = await blogService.update(blog.id)
		const newBlogs = blogs.filter((current) => current.id !== blog.id)
		setBlogs(newBlogs.concat(response))
		setLikes(!likes)
	}
	*/
	return (
		<div>
			<Notification />
			<div>
				{user === null ? (
					<LoginForm
						handleLogin={handleLogin}
						user={user}
						username={username}
						password={password}
						handleUsernameChange={({ target }) =>
							setUsername(target.value)
						}
						handlePasswordChange={({ target }) =>
							setPassword(target.value)
						}
						setUser={setUser}
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
					blogs={blogs}
					//setBlogs={setBlogs}
					user={user}
					//handleLike={handleLike}
				/>
			))}
		</div>
	)
}

export default App
