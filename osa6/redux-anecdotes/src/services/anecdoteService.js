import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes/';

export const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
}

export const postAnecdote = async (a) => {
    const res = await axios.post(baseUrl, a);
    return res.data;
}

export const voteAnecdote = async (id) => {
    const data = await axios.get(baseUrl + id);
    var objToSend = {
        ...data.data,
        votes: data.data.votes + 1
    }
    var url = baseUrl + id;
    const res = await axios.put(url, objToSend);
    return res;
}