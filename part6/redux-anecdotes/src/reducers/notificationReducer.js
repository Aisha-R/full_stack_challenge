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

export const setNotification = (message, timout) => {
    return async dispatch => {
        dispatch(createNotification(message))
        setTimeout(() => dispatch(removeNotification(null)), timout * 1000)
    }
}

export default notificationSlice.reducer