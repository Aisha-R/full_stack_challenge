import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload
		}
	}
})

export const { setUser } = loginSlice.actions

export const login = (credentials) => {
	return async (dispatch) => {
		const user = await loginService.login(credentials)

		window.localStorage.setItem(
			'loggedBlogappUser',
			JSON.stringify(user)
		)

		blogService.setToken(user.token)
		dispatch(setUser(user))
	}
}

export default loginSlice.reducer