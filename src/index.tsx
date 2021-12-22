import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//=========== REDUX ===========
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { postApp } from './store/reducers/postsReducers';
import './main.scss'

//Crea el store y se le pasa por parámetro la función de reducer. Creas el componente Provider y le pasas por props el store, este componente debe envolver a toda la aplicación
const store = createStore(postApp) //define el store en base  al combineReducers()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

