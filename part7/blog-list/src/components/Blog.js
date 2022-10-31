import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

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
			<h2>{blog.title}</h2>
			<p>{blog.url}</p>
			<p>{blog.likes} likes</p>
			<button className="likeButton" onClick={() => handleLike(blog)}>
				like
			</button>
			<p>added by {blog.author}</p>
			{user &&
				<button onClick={() => handleDelete(blog)}>
					remove
				</button>
			}
			<h3>comments</h3>
			<input
				type="text"
				name="Comment"
				value={comment}
				onChange={({ target }) => setComment(target.value)}
			/>
			<button onClick={() => handleComment()}>add comment</button>
			<ul>
				{blog.comments.map((comment, index) =>
					<li key={index}>{comment}</li>
				)}
			</ul>
		</div>
	)
}

export default Blog