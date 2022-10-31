import { useEffect } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import LoginHandler from './components/LoginHandler'
import Notification from './components/Notification'

const App = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
		dispatch(initializeBlogs())
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
		}
	}, [])

	const blogs = useSelector(({ blogs }) => [...blogs].sort((b1, b2) => b2.likes - b1.likes))
	const user = useSelector(({ user }) => user)
	const users = useSelector(({ users }) => users)

	const matchBlog = useMatch('/blogs/:id')
	const navigate = useNavigate()

	return (
		<div>
			<Notification />
			<h2>blogs</h2>
			<LoginHandler user={user} />
			<Routes>
				<Route path='/' element={<Blogs blogs={blogs} />} />
				<Route path='/users' element={<Users users={users}/>} />
				<Route path='/users/:id' element={<User users={users} />} />
				<Route path='/blogs/:id' element={<Blog user={user} blogs={blogs} navigate={navigate} matchBlog={matchBlog} />} />
			</Routes>
		</div>
	)
}

export default App