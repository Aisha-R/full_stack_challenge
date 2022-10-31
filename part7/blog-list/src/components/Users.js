import { Link } from 'react-router-dom'
import {
	Typography,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@mui/material'

const Users = ({ users }) => {

	return (
		<div>
			<Typography variant="h3">
				users
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>
								blogs created
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>
									<Link to={`/users/${user.id}`}>{user.name}</Link>
								</TableCell>
								<TableCell>
									{user.blogs.length}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Users