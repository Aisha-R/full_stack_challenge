import { useMatch } from 'react-router-dom'

const User = ({ users }) => {
	const matchUser = useMatch('/users/:id')

	const userDetails = matchUser
		? users.find(user => user.id === matchUser.params.id)
		: null

	if (!userDetails) {
		return null
	}

	return (
		<div>
			<h2>{userDetails.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{userDetails.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}

export default User