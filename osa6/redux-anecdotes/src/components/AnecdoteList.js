import React from 'react';
import { connect } from 'react-redux';
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ anecdotes, filter, showNotification, hideNotification }) => {
    const fanecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));

    const vote = (id, content) => {
        anecdotes.dispatch({ type: 'VOTE', data: { id } });
        showNotification('you voted \'' + content + '\'');
        setTimeout(() => {
            hideNotification();
        }, 5000)
    }

    return (
        <>
            {fanecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
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

const mapDispatchToProps = dispatch => {
    return {
        showNotification: value => {
            dispatch(showNotification(value))
        },
        hideNotification: value => {
            dispatch(hideNotification(value))
        }
    }
}

const CAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default CAnecdoteList;