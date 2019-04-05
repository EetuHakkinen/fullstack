import axios from 'axios';
var baseUrl = '/api/persons/'

export const getAll = () => {
    return axios.get(baseUrl)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(e => {
            console.error(e);
            return [];
        });
}

export const addNumber = (props) => {
    console.log('person', props);
    return axios.post(baseUrl, props)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(e => console.error(e));
}

export const deletePerson = (id) => {
    return axios.delete(baseUrl + id);
}

export const replaceNumber = (id, number, name) => {
    return axios.put(baseUrl + id, { name, number });
}