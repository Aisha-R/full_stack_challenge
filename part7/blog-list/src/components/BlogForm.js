import { useState } from 'react'

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
					title
					<input
						type="text"
						id="title"
						value={title}
						name="title"
						onChange={handleTitleChange}
						placeholder="type title"
					/>
				</div>
				<div>
					author
					<input
						type="text"
						id="author"
						value={author}
						name="author"
						onChange={handleAuthorChange}
						placeholder="type author"
					/>
				</div>
				<div>
					url
					<input
						type="text"
						id="url"
						value={url}
						name="url"
						onChange={handleUrlChange}
						placeholder="type url"
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</>
	)
}

export default BlogForm
