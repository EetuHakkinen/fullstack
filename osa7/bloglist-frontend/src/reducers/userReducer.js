const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'SET':
            return action.data;
        default: 
            return state;
    }
}

export const setUser = (user) => {
    console.log(user);
    return {
        type: 'SET',
        data: user,
    }
}

export default userReducer;