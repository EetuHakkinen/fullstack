
import axios from 'axios';
const baseUrl = '/api/login';

const login = (props) => {
    return axios.post(baseUrl, props)
        .then(r => {
            if (r.status === 401) {
                return 'wrong password';
            }
            return r.data;
        })
        .catch(e => e);
}

export default login;