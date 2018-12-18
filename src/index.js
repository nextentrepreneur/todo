import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware} from 'redux';
import  thunkMiddleware  from 'redux-thunk';
import { Provider } from 'react-redux';
import Reducer  from './reducers/Reducer';
import 'typeface-roboto';
import '../src/styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(Reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>, document.getElementById('todoapp'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
