import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';

import Game from './components/GameController';
import * as serviceWorker from './serviceWorker';

const DEBUG = false;
const MOUNT = document.getElementById('root');

function renderRoot(Game) {
  ReactDOM.render(
    <BrowserRouter>
      <Game debug={DEBUG}/>
    </BrowserRouter>,
    MOUNT
  );
}

renderRoot(Game);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

declare var module: any;

if (module.hot) {
  module.hot.accept('./components/GameController', () => {
    const Game = require('./components/GameController').default;

    renderRoot(Game);
  });
}