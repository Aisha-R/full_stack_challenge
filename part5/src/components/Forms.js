import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const BlogForm = ({ blogs, setBlogs, setMessage }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = await blogService.create({ title, author, url })

            setBlogs(blogs.concat(blog))

            setMessage(`a new blog ${title} by ${author} added`)
            setTimeout(() => {
                setMessage('')
            }, 5000)

        } catch (error) {
            setMessage('unable to carry out operation')
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                    type="text"
                    value={url}
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )

    return (
        <>
            {blogForm()}
        </>
    )
}

const LoginForm = ({ user, setUser, setMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {

            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            blogService.setToken(user.token)

            setUser(user)

        } catch (error) {
            setMessage(error.response.data.error)
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }

        setUsername('')
        setPassword('')
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    return (
        <>
            {loginForm()}
        </>
    )
}

const Forms = ({ user, setUser, blogs, setBlogs, setMessage }) => {

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    return (
        <div>
            {user === null ?
                <LoginForm user={user} setUser={setUser} setMessage={setMessage} /> :
                <div>
                    <p>{user.name} logged-in</p>
                    <button onClick={() => handleLogout()}>Log Out</button>
                    <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
                </div>
            }
        </div>
    )
}

export default Forms