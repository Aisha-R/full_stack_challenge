import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [likes, setLikes] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
      setLikes(!likes);
    });
  }, []);

  useEffect(() => {
    const sorted = [...blogs].sort((b1, b2) => b2.likes - b1.likes);

    setBlogs(sorted);
  }, [likes]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }

    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (returnedBlog) => {
    try {
      const blog = await blogService.create(returnedBlog);

      setBlogs(blogs.concat(blog));

      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleLike = async (blog) => {
    const response = await blogService.update(blog.id);
    const newBlogs = blogs.filter((current) => current.id !== blog.id);
    setBlogs(newBlogs.concat(response));
    setLikes(!likes);
  };

  return (
    <div>
      <Notification message={message} />
      <div>
        {user === null ? (
          <LoginForm
            handleLogin={handleLogin}
            user={user}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            setUser={setUser}
            setMessage={setMessage}
          />
        ) : (
          <div>
            <p>{user.name} logged-in</p>
            <button onClick={() => handleLogout()}>Log Out</button>
            <div>
              <Togglable buttonLabel="new blog">
                <BlogForm addBlog={addBlog} />
              </Togglable>
            </div>
          </div>
        )}
      </div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          handleLike={handleLike}
        />
      ))}
    </div>
  );
};

export default App;
