const notificationReducer = (state = { show: false, message: '' }, action) => {
    switch (action.type) {
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

const hide = (dispatch) => {
    dispatch({
        type: 'CHANGE',
        data: {
            show: false,
            message: '',
        }
    });
}

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'CHANGE',
            data: {
                show: true,
                message,
            }
        });
        setTimeout(() => {
            hide(dispatch);
        }, time * 1000);
    }
}

export default notificationReducer;