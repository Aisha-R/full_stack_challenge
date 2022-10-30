import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		createBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		},
	},
})

export const { createBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const newBlog = (content) => {
	return async (dispatch) => {
		const blog = await blogService.create(content)
		dispatch(createBlog(blog))
	}
}

export default blogSlice.reducer
