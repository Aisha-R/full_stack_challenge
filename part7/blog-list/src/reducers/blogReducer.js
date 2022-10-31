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
		amendBlog(state, action) {
			return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
		},
		removeBlog(state, action) {
			return state.filter(blog => blog.id !== action.payload.id)
		}
	},
})

export const { createBlog, setBlogs, amendBlog, removeBlog } = blogSlice.actions

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

export const updateBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(blog.id, blog)
		dispatch(amendBlog(updatedBlog))
	}
}

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		await blogService.remove(blog.id)
		dispatch(removeBlog(blog))
	}
}

export default blogSlice.reducer
