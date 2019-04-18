import blogService from '../services/blogs';

export const init = () => {
    return async dispatch => {
        const res = await blogService.getAll();
        dispatch({
            type: 'INIT',
            data: res,
        })
    }
}

export const createBlog = (data) => {
    blogService.postNew(data);
    return {
        type: 'CREATE',
        data
    }
}

const blogReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT': 
            return action.data;
        case 'CREATE':
            return [...state, action.data];
        default: 
            return state;
    }
}

export default blogReducer;