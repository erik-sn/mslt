import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import router from './routes';


injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>{router}</Router>,
  document.querySelector('.react-container')
);
