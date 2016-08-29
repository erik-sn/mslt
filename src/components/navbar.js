if (process.env.BROWSER) {
  require('../sass/navbar.scss');
}

import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from './application';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.clientId = '72cf5f6567a4f2de102c';

    this.state = {

    };
  }

  /**
   * Redirect the user to github to begin authentication procedure
   */
  login() {
    window.open(`https://github.com/login/oauth/authorize?redirect_uri=http://localhost:3000&client_id=${this.clientId}`, '_self');
  }

  logout() {
    const { auth, logout } = this.props;
    axios.post(`${API_URL}/api/logout/?client_id=${this.clientId}&access_token=${auth.access_token}`,
    { client_id: this.clientId, access_token: auth.access_token });
    logout();
  }

  render() {
    const { toggleAdmin, auth, activeEntry } = this.props;
    const title = activeEntry.title ? activeEntry.title : '';
    return (
      <div id="navbar-container" >
        <div id="navbar-title">Make Stuff & Learn Things<span className="navbar-active-title">{title}</span></div>
        <div id="navbar-button-container">
          {auth && auth.isAdmin ? <button onClick={() => toggleAdmin()}>Admin</button> : ''}
          {auth ?
            <button onClick={() => this.logout()}>Logout</button> :
            <button onClick={() => this.login()}>Login</button>
          }
        </div>
      </div>
    );
  }
}