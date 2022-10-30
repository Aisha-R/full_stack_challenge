import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
	},
})

export const { setNotification, removeNotification } = notificationSlice.actions
let timeoutId = ''
export const createNotification = (message, seconds) => {
	return async (dispatch) => {
		clearTimeout(timeoutId)
		dispatch(setNotification(message))
		timeoutId = setTimeout(
			() => dispatch(setNotification(null)),
			seconds * 1000
		)
	}
}

export default notificationSlice.reducer
