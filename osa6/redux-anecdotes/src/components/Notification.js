import React from 'react';

const CNotification = ({ store }) => {
    const notification = store.getState().notification;
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        display: notification.show
    }
    return (
        <div style={style}>
            {notification.message}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

const Notification = (mapStateToProps)(CNotification)
export default Notification;
