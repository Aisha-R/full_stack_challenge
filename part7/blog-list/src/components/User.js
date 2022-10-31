import { useMatch } from 'react-router-dom'
import {
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemText
} from '@mui/material'

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
			<Typography variant="h3">
				{userDetails.name}
			</Typography>
			<Typography variant="h4">
				added blogs
			</Typography>
			<List>
				{userDetails.blogs.map((blog) => (
					<ListItem key={blog.id}>
						<ListItemButton>
							<ListItemText primary={blog.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default User