import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector((state) => state.notification)

	let style = {
		color: 'grey',
		textAlign: 'center',
		fontSize: 20,
		borderStyle: 'solid',
		padding: 5,
		marginBottom: 10,
	}

	if (notification === null) {
		style = {}
	}

	return (
		<div style={style}>
			<p style={{ margin: 5 }}>{notification}</p>
		</div>
	)
}

export default Notification
