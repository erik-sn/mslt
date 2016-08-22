if (process.env.BROWSER) {
  require('../sass/style.scss');
}

import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './navbar';
import Admin from './admin';
import Main from './main';

export const API_URL = 'https://kiresuah.me/api';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAdmin: true,
    };
  }

  render() {
    const { showAdmin } = this.state;
    return (
      <div id="app-container">
        <Navbar />
        {showAdmin ? <Admin /> : <Main />}
      </div>
    );
  }
}
