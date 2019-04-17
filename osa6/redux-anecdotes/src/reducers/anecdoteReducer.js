const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject);

export const create = (content) => {
    return {
        type: 'NEW',
        data: {
            content,
            id: getId(),
            votes: 0
        }
    }
}

const sortState = (state) => {
    var newState = state.sort((a, b) => b.votes - a.votes);
    return newState;
}

export const vote = (id) => {
    return {
        type: 'VOTE',
        data: {
            id
        }
    }
}

const anecdoteReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW':
            return [...state, action.data];
        case 'VOTE':
            for(var a in state) {
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
        default: return sortState(state);
    }
    return sortState(state);
}

export default anecdoteReducer