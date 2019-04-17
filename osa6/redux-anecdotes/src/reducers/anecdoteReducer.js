import { getAll, postAnecdote, voteAnecdote } from '../services/anecdoteService';

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

//const initialState = anecdotesAtStart.map(asObject);

export const create = (content) => {
    return async dispatch => {
        await postAnecdote(asObject(content));
        dispatch({
            type: 'NEW',
            data: {
                content,
                id: getId(),
                votes: 0
            }
        })

    }
}

export const init = () => {
    return async dispatch => {
        const anecdotes = sortState(await getAll());
        dispatch({
            type: 'INIT',
            data: anecdotes
        });
    }
}

const sortState = (state) => {
    var newState = state.sort((a, b) => b.votes - a.votes);
    return newState;
}

export const vote = (id) => {
    return async dispatch => {
        await voteAnecdote(id);
        dispatch({
            type: 'VOTE',
            data: {
                id
            }
        })

    }
}

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW':
            return [...state, action.data];
        case 'VOTE':
            for (var a in state) {
                if (state[a].id === action.data.id) {
                    var newState = state;
                    newState[a] = {
                        content: state[a].content,
                        id: state[a].id,
                        votes: state[a].votes + 1
                    }
                    return sortState(newState);
                }
            }
            break;
        case 'INIT':
            return action.data;
        default: return sortState(state);
    }
    return sortState(state);
}

export default anecdoteReducer