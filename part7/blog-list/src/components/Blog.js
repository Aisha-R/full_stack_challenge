import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import {
	TextField,
	Button,
	Typography
} from '@mui/material'

const Blog = ({ user, blogs, navigate, matchBlog }) => {

	const blog = matchBlog
		? blogs.find(blog => blog.id === matchBlog.params.id)
		: null

	if (!blog) {
		return null
	}

	const dispatch = useDispatch()

	const handleLike = async (blog) => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		dispatch(updateBlog(updatedBlog))
	}

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog))
			navigate('/')
		}
	}

	const [ comment, setComment ] = useState('')

	const handleComment = () => {
		const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
		dispatch(updateBlog(updatedBlog))
		setComment('')
	}

	return (
		<div>
			<Typography variant="h4">
				{blog.title}
			</Typography>
			<Typography variant="h5">
				{blog.url}
			</Typography>
			<Typography variant="h5">
				{blog.likes} likes
			</Typography>
			<Button variant="contained" color="primary" className="likeButton" onClick={() => handleLike(blog)}>
				like
			</Button>
			<Typography variant="h5">
				added by {blog.author}
			</Typography>
			{user &&
				<Button variant="contained" color="primary" onClick={() => handleDelete(blog)}>
					remove
				</Button>
			}
			<h3>comments</h3>
			<div>
				<TextField
					name="Comment"
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
			</div>
			<div>
				<Button variant="contained" color="primary" onClick={() => handleComment()}>
					add comment
				</Button>
			</div>
			<ul>
				{blog.comments.map((comment, index) =>
					<li key={index}>{comment}</li>
				)}
			</ul>
		</div>
	)
}

export default Blog