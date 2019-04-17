const filterReducer = (state='', action) => {
    switch(action.type) {
        case 'SET':
            return action.data.filter;
        default: 
            return state;
    }
}

export const setFilter = (text) => {
    return {
        type: 'SET',
        data: {
            filter: text
        }
    }
}

export default filterReducer;