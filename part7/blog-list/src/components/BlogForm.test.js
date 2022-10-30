import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test.only('<BlogForm /> calls onSubmit', async () => {
	const addBlog = jest.fn()
	const user = userEvent.setup()

	render(<BlogForm addBlog={addBlog} />)

	const sendButton = screen.getByText('create')

	const titleInput = screen.getByPlaceholderText('type title')
	await userEvent.type(titleInput, 'First class tests')

	const authorInput = screen.getByPlaceholderText('type author')
	await user.type(authorInput, 'Robert C. Martin')

	const urlInput = screen.getByPlaceholderText('type url')
	await user.type(
		urlInput,
		'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
	)

	await user.click(sendButton)

	expect(addBlog.mock.calls).toHaveLength(1)
	expect(addBlog.mock.calls[0][0].title).toBe('First class tests')
	expect(addBlog.mock.calls[0][0].author).toBe('Robert C. Martin')
	expect(addBlog.mock.calls[0][0].url).toBe(
		'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
	)
})
