import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import BlogForm from '../components/BlogForm'
import { Link } from 'react-router-dom'
import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@mui/material'

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

	return (
		<div>
			<div>
				<Togglable buttonLabel="new blog">
					<BlogForm addBlog={addBlog} />
				</Togglable>
			</div>
			<Typography variant="h3">
				blogs
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{blogs.map((blog) => (
							<TableRow key={blog.id}>
								<TableCell>
									<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
								</TableCell>
								<TableCell>
									{blog.author}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Blogs