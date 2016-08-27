if (process.env.BROWSER) {
  require('../sass/navbar.scss');
}

import React, { Component } from 'react';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * Redirect the user to github to begin authentication procedure
   */
  login() {
    const clientId = 'c77de98b2bc44fe09b80';
    window.open(`https://github.com/login/oauth/authorize?redirect_uri=http://localhost:3000/&client_id=${clientId}`, '_self');
  }

  render() {
    const { logout, isAdmin, toggleAdmin, user } = this.props;
    return (
      <div id="navbar-container" >
        {isAdmin ? <button onClick={() => toggleAdmin()}>Admin</button> : ''}
        {user ?
          <button onClick={() => logout()}>Logout</button> :
          <button onClick={() => this.login()}>Login</button>
        }
      </div>
    );
  }
}