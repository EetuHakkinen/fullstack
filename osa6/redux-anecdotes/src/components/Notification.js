import React from 'react';
import { connect } from 'react-redux';

const CNotification = ({ notification }) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        display: notification.show
    }
    if (!notification.show) {
        return null;
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

const Notification = connect(mapStateToProps)(CNotification)
export default Notification;
