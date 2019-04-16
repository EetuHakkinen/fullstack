const notificationReducer = (state={ show: false, message: '' }, action) => {
    switch(action.type) {
        case 'CHANGE':
            return { ...action.data };
        default: 
            return state;
    }
}

export const showNotification = (message) => {
    return {
        type: 'CHANGE',
        data: {
            show: true,
            message
        }
    }
}

export const hideNotification = () => {
    return {
        type: 'CHANGE',
        data: {
            show: false,
            message: ''
        }
    }
}

export default notificationReducer;