import React from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { create } from '../reducers/anecdoteReducer';

const CAnecdoteForm = ({ create, setNotification }) => {
    const ccreate = (event) => {
        event.preventDefault();
        create(event.target.newAnecdoteForm.value);
        setNotification(`You created ${event.target.newAnecdoteForm.value}`, 5)
        event.target.newAnecdoteForm.value = '';
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={(e) => ccreate(e)}>
                <div><input name="newAnecdoteForm" /></div>
                <button type="submit">create</button>
            </form>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}

const AnecdoteForm = connect(mapStateToProps, { create, setNotification })(CAnecdoteForm);
export default AnecdoteForm;