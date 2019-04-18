import axios from 'axios';

const baseUrl = '/api/users'

export const getAllUsers = async () => {
    var res = await axios.get(baseUrl);
    return res.data;
}