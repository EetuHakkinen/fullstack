
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postNew = (props) => {
    const config = {
        headers: { Authorization: 'bearer ' + props.token }
    }
    axios.post(baseUrl, { title: props.title, author: props.author, url: props.url }, config);
}

const like = ({blog}) => {
    const obj = {
        user: blog.user._id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }
    axios.post(baseUrl + '/' + blog._id, obj);
}

const remove = (id) => {
    axios.delete(baseUrl + '/' + id);
}

const comment = async (id, content) => {
    var prevComments = await axios.get(baseUrl + '/' + id + '/comments');
    axios.put(baseUrl + '/' + id + '/comments', prevComments.concat(content));
}

export default { getAll, postNew, like, remove, comment}