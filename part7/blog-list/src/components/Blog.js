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
		dispatch(updateBlog(blog))
	}

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog))
			navigate('/')
		}
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
			<ul>
				{blog.comments.map((comment, index) =>
					<li key={index}>{comment}</li>
				)}
			</ul>
		</div>
	)
}

export default Blog