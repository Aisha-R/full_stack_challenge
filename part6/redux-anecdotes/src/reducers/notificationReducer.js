import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return action.payload
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions
let timeoutId = ''
export const setNotification = (message, seconds) => {
    return async dispatch => {
        clearTimeout(timeoutId)
        dispatch(createNotification(message))
        timeoutId = setTimeout(() => dispatch(removeNotification(null)), seconds * 1000)
    }
}

export default notificationSlice.reducer