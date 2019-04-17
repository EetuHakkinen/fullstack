import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux';
import blogReducer from './reducers/blogReducer';
import { Provider } from 'react-redux';

const store = createStore(blogReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'))