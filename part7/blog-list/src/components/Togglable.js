import { useState } from 'react'
import PropTypes from 'prop-types'
import {
	Button
} from '@mui/material'

const Togglable = (props) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button variant="contained" color="primary" onClick={toggleVisibility}>
					{props.buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible} className="hiddenInitially">
				<Button variant="contained" color="primary" onClick={toggleVisibility}>
					hide
				</Button>
				{props.children}
			</div>
		</div>
	)
}

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
