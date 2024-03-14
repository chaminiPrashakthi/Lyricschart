import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';
import lyricsChartReducer from './reducers/musichart';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './reducers/user';


const rootReducer = combineReducers({
  lyrics: lyricsChartReducer,
  users: userReducer

});
const store = createStore(rootReducer);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
