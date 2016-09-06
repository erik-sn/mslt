import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import router from './routes';

ReactDOM.render(
  <Router history={browserHistory}>{router}</Router>,
  document.querySelector('.react-container')
);
