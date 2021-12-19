import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Routing from './config/Routes'
//=========== REDUX ===========
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {postApp} from './store/reducers/postsReducers';
import './main.scss'

//Crea el store y se le pasa por parámetro la función de reducer. Creas el componente Provider y le pasas por props el store, este componente debe envolver a toda la aplicación
const store = createStore(postApp)

ReactDOM.render(

    <Provider store={store}> 
      <App />
      <Routing />
    </Provider>,
  document.getElementById('root')
);

