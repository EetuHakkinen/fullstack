import React from 'react';
import { connect } from 'react-redux';
import { showNotification, hideNotification } from '../reducers/notificationReducer';
import { vote } from '../reducers/anecdoteReducer';

const CAnecdoteList = ({ visibleAnecdotes, vote, showNotification, hideNotification }) => {
    const fanecdotes = visibleAnecdotes;

    const voteA = (id, content) => {
        vote(id);
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
                        <button onClick={() => voteA(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
}

const anecdotesToShow = ({anecdotes, filter}) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
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
        },
        vote: value => {
            dispatch(vote(value))
        }
    }
}

const AnecdoteList = connect(mapStateToProps, mapDispatchToProps)(CAnecdoteList);
export default AnecdoteList;