import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import getAll from './services/blogs'
import login from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const [user, setUser] = useState(null)

  useEffect(() => {
    getAll().then(blogs =>
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

        const user = await login({ username, password })

        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 

        setUser(user)
        setUsername('')
        setPassword('')
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
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

    const addBlog = async (event) => {
        event.preventDefault()
    }

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <input
                value={newBlog}
                onChange={({ target }) => setNewBlog(target.value)}
            />
            <button type="submit">save</button>
        </form>
    )

  return (
    <div>
      {user === null ?
        loginForm() :
          <div>
                  <p>{user.name} logged-in</p>
                  <button onClick={() => handleLogout() }>Log Out</button>
            {blogForm()}
        </div>
      }   
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
