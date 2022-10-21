import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState('') 
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    useEffect(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

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

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const addBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = await blogService.create({ title, author, url })

            setBlogs(blogs.concat(blog))

            setBlogFormVisible(false)

            setMessage(`a new blog ${title} by ${author} added`)
            setTimeout(() => {
                setMessage('')
            }, 5000)

        } catch (error) {
            console.log(error)
            setMessage('unable to carry out operation')
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const blogForm = () => {
        const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
        const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setBlogFormVisible(true)}>show blog form</button>
                </div>
                <div style={showWhenVisible}>
                    <BlogForm
                        title={title}
                        author={author}
                        url={url}
                        addBlog={addBlog}
                        handleTitleChange={({ target }) => setTitle(target.value)}
                        handleAuthorChange={({ target }) => setAuthor(target.value)}
                        handleUrlChange={({ target }) => setUrl(target.value)}
                    />
                    <button onClick={() => setBlogFormVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }
    
  return (
      <div>
          <Notification message={message} />
          <div>
              {user === null ?
                  <LoginForm
                      handleLogin={handleLogin}
                      user={user}
                      username={username}
                      password={password}
                      handleUsernameChange={({ target }) => setUsername(target.value)}
                      handlePasswordChange={({ target }) => setPassword(target.value)}
                      setUser={setUser}
                      setMessage={setMessage} /> :
                  <div>
                      <p>{user.name} logged-in</p>
                      <button onClick={() => handleLogout()}>Log Out</button>
                      {blogForm()}
                  </div>
              }
          </div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
  )
}

export default App
