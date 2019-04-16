const filterReducer = (state='', action) => {
    switch(action.type) {
        case 'SET':
            return action.data.filter;
        default: 
            return state;
    }
}

export default filterReducer;