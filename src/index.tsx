import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';

import { Story } from 'inkjs/dist/ink';
import storyJson from './ink/intro.ink.json';

import Root from './components/Root';
import * as serviceWorker from './serviceWorker';

const mountTarget = document.getElementById('root');

const storyEngine = new Story(storyJson)

ReactDOM.render(
  <BrowserRouter>
    <Root storyEngine={storyEngine}/>
  </BrowserRouter>,
  mountTarget
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
