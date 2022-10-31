import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import BlogForm from '../components/BlogForm'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {

	const dispatch = useDispatch()

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

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const pStyle = { margin: 5 }

	return (
		<div>
			<div>
				<Togglable buttonLabel="new blog">
					<BlogForm addBlog={addBlog} />
				</Togglable>
			</div>
			<h2>blogs</h2>
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle} className="blog">
					<p style={pStyle}>
						<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
					</p>
				</div>
			))}
		</div>
	)
}

export default Blogs