if (process.env.BROWSER) {
  require('../sass/style.scss');
}

import React, { Component } from 'react';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test: 'test',
    };
  }

  render() {
    return (
      <div id="test-container">
        {this.state.test}
      </div>
    );
  }
}
