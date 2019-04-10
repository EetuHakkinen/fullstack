
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

export default { getAll, postNew }