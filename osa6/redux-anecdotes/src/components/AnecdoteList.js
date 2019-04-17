import React from 'react';
import { connect } from 'react-redux';
import { showNotification, hideNotification, setNotification } from '../reducers/notificationReducer';
import { vote } from '../reducers/anecdoteReducer';

const CAnecdoteList = ({ visibleAnecdotes, vote, showNotification, hideNotification, setNotification }) => {
    const fanecdotes = visibleAnecdotes;

    const voteA = (id, content) => {
        vote(id);
        console.log(setNotification);
        setNotification(`You voted ${content}`, 5)
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
        },
        setNotification: value => {
            dispatch(setNotification(value));
        },
    }
}

const AnecdoteList = connect(mapStateToProps, mapDispatchToProps)(CAnecdoteList);
export default AnecdoteList;