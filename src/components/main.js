import React, { Component } from 'react';
import marked from 'marked';
import * as _ from 'lodash';
import ConnectBar from './connect_bar';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps.activeEntry, this.props.activeEntry)) {
      return false;
    }
    return true;
  }

  render() {
    const { activeEntry } = this.props;
    if (!activeEntry || !activeEntry.content) {
      return <div id="post-container"></div>;
    }
    return (
      <div id="post-container">
        <ConnectBar />
        <h2 className="entry-title">{activeEntry.title}</h2>
        <h4 className="entry-description">{activeEntry.description}</h4>
        <div id="content-container" dangerouslySetInnerHTML={{ __html: marked(activeEntry.content) }} />
      </div>
    );
  }
}
