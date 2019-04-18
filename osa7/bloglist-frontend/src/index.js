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
import Header from './components/Header';
import User from './components/User';
import Blogpage from './components/Blogpage';

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <div className="container">
        <Provider store={store}>
            <Router>
                <Header />
                <Route exact path="/" render={() => <App />} />
                <Route exact path="/users" render={() => <Users />} />
                <Route exact path="/users/:id" render={({ match }) =>
                    <User data={match.params.id} />}
                />
                <Route exact path="/blogs/:id" render={({ match }) =>
                    <Blogpage id={match.params.id} />}
                />
            </Router>
        </Provider>
    </div>,
    document.getElementById('root'))