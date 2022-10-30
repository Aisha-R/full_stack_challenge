import Togglable from './Togglable'

const Blog = ({ blog, user, handleLike, handleDelete }) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const pStyle = { margin: 5 }

	return (
		<div style={blogStyle} className="blog">
			<p style={pStyle}>
				{blog.title} {blog.author}
			</p>
			<Togglable buttonLabel="view">
				<p style={pStyle}>{blog.url}</p>
				<p style={pStyle} id="noOfLikes">
					likes {blog.likes}
				</p>{' '}
				<button className="likeButton" onClick={() => handleLike(blog)}>
					like
				</button>
				<p style={pStyle}>{blog.user.name}</p>
				{user && user.username === blog.user.username && (
					<button onClick={() => handleDelete(blog)}>remove</button>
				)}
			</Togglable>
		</div>
	)
}

export default Blog
