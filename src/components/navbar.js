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

  render() {
    return (
      <div id="navbar-container" >
        <button onClick={() => this.props.toggleAdmin()}>Admin</button>
      </div>
    );
  }
}