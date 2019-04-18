import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
    if (!props.message) {
        return null;
    }
    return props.message
}

const mapStateToProps = (state) => {
    return {
        notification: state.notificationReducer
    }
}

export default connect(mapStateToProps)(Notification);