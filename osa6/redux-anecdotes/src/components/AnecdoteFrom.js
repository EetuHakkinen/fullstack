import React from 'react';
import { connect } from 'react-redux';
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const CAnecdoteForm = ({ store }) => {
    const create = (event) => {
        event.preventDefault();
        store.dispatch(create(event.target.newAnecdoteForm.value));
        store.dispatch(showNotification('you created \'' + event.target.newAnecdoteForm.value + '\''));
        setTimeout(() => {
            store.dispatch(hideNotification());
        }, 5000)
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={(e) => create(e)}>
                <div><input name="newAnecdoteForm" /></div>
                <button type="submit">create</button>
            </form>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const AnecdoteForm = connect(mapStateToProps)(CAnecdoteForm);
export default AnecdoteForm;