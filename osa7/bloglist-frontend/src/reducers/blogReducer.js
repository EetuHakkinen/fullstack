export const init = (data) => {
    return {
        type: 'INIT',
        data
    }
}

const blogReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT': 
            return action.data;
        default: 
            return state;
    }
}

export default blogReducer;