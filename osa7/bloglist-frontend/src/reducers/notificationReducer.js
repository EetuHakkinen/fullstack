const notificationReducer = (state='', action) => {
    switch(action.type) {
        case 'SHOW': 
            return action.data.message;
        default: 
            return state;
    }
}

export default notificationReducer;

export const showNotification = (mes) => {
    return {
        type: 'SHOW',
        data: {
            message: mes,
        }
    }
}