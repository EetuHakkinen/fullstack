import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = (props) => {
    return (
        <div>
            {props.message && <Alert variant="info">{props.message}</Alert>}
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        notification: state.notificationReducer
    }
}

export default connect(mapStateToProps)(Notification);