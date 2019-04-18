import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { combineReducers, applyMiddleware } from 'redux';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Users from './components/Users';

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" render={() => <App />} />
            <Route exact path="/users" render={() => <Users />} />
        </Router>
        
    </Provider>,
    document.getElementById('root'))