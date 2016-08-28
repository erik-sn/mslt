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
    const clientId = '72cf5f6567a4f2de102c';
    window.open(`https://github.com/login/oauth/authorize?redirect_uri=http://localhost:3000&client_id=${clientId}`, '_self');
  }

  render() {
    const { logout, toggleAdmin, auth } = this.props;
    return (
      <div id="navbar-container" >
        {auth && auth.isAdmin ? <button onClick={() => toggleAdmin()}>Admin</button> : ''}
        {auth ?
          <button onClick={() => logout()}>Logout</button> :
          <button onClick={() => this.login()}>Login</button>
        }
        <div>{auth && auth.username ? auth.username : ''}</div>
      </div>
    );
  }
}