import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ blog, blogs, setBlogs }) => {

    const handleLike = async () => {
        
        const response = await blogService.update(blog.id)
        
        const newBlogs = blogs.filter(current => current.id !== blog.id)
        
        setBlogs(newBlogs.concat(response))
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const pStyle = { margin: 5 }

    return (
        <div style={blogStyle}>
            <p style={pStyle}>{blog.title} {blog.author}</p>
            <Togglable buttonLabel='view'>
                <p style={pStyle}>{blog.url}</p>
                <p style={pStyle}>likes {blog.likes}</p> <button onClick={handleLike}>like</button>
                <p style={pStyle}>{blog.user.name}</p>
            </Togglable>
        </div>
    )
}

export default Blog