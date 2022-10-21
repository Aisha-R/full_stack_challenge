import Togglable from './Togglable'

const Blog = ({ blog }) => {

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
                <p style={pStyle}>likes {blog.likes}</p> <button>like</button>
                <p style={pStyle}>{blog.user.name}</p>
            </Togglable>
        </div>
    )
}

export default Blog