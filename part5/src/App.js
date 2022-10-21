import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Forms from './components/Forms'
import Notification from './components/Notification'
import blogService from './services/blogs'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState('') 
    const [user, setUser] = useState(null)

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
    
  return (
      <div>
          <Notification message={message} />
          <Forms user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
  )
}

export default App
