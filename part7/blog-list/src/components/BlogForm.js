import { useState } from 'react'
import {
	TextField,
	Button
} from '@mui/material'

const BlogForm = ({ addBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleTitleChange = ({ target }) => {
		setTitle(target.value)
	}

	const handleAuthorChange = ({ target }) => {
		setAuthor(target.value)
	}

	const handleUrlChange = ({ target }) => {
		setUrl(target.value)
	}

	const handleBlog = (event) => {
		event.preventDefault()

		addBlog({ title, author, url })

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<>
			<form onSubmit={handleBlog}>
				<div>
					<TextField
						label="title"
						id="title"
						value={title}
						name="title"
						onChange={handleTitleChange}
						placeholder="type title"
					/>
				</div>
				<div>
					<TextField
						label="author"
						id="author"
						value={author}
						name="author"
						onChange={handleAuthorChange}
						placeholder="type author"
					/>
				</div>
				<div>
					<TextField
						label="URL"
						id="url"
						value={url}
						name="url"
						onChange={handleUrlChange}
						placeholder="type url"
					/>
				</div>
				<div>
					<Button id="blog-button" variant="contained" color="primary" type="submit">
						create
					</Button>
				</div>
			</form>
		</>
	)
}

export default BlogForm
