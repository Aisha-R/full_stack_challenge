import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotification(state, action) {
			return action.payload
		}
	}
})

export const { setNotification } = notificationSlice.actions
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
