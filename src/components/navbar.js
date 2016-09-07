if (process.env.BROWSER) {
  require('../sass/navbar.scss');
}

import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

import { API_URL } from './application';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.clientId = '72cf5f6567a4f2de102c';

    this.state = {

    };
    this.home = this.home.bind(this);
    this.portfolio = this.portfolio.bind(this);
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

  home() {
    browserHistory.push('/');
  }

  portfolio() {
    window.location.href = 'https://kiresuah.me/portfolio';
  }

  render() {
    const { toggleAdmin, auth, activeEntry } = this.props;
    return (
      <div id="navbar-container" >
        <div id="img-container">
          <img height="150" width="150" src="https://res.cloudinary.com/dvr87tqip/image/upload/v1461600642/me_coz7xt.png" />
        </div>
        <div id="navbar-button-container">
          <div className="nav-button" onClick={this.home}>Home</div>
          <div className="nav-button" onClick={this.portfolio}>Portfolio</div>
          {auth && auth.isAdmin ? <div className="nav-button" onClick={() => toggleAdmin()}>Admin</div> : ''}
          {auth ?
            <div className="nav-button" onClick={() => this.logout()}>Logout</div> :
            <div className="nav-button" onClick={() => this.login()}>Login</div>
          }
        </div>
      </div>
    );
  }
}
