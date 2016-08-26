if (process.env.BROWSER) {
  require('../sass/display.scss');
}

import React, { Component } from 'react';
import marked from 'marked';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { activeEntry } = this.props;
    return (
      <div id="main-container">
        <div id="active-entry-container">
          {!activeEntry || !activeEntry.content ? '' :
            <div>
              <h2 className="entry-title">{activeEntry.title}</h2>
              <h4 className="entry-description">{activeEntry.description}</h4>
              <div id="content-container" dangerouslySetInnerHTML={{ __html: marked(activeEntry.content) }} />
            </div>
          }
        </div>
      </div>
    );
  }
}
