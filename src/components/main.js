if (process.env.BROWSER) {
  require('../sass/admin.scss');
}

import React, { Component } from 'react';
import axios from 'axios';
import marked from 'marked';

import { API_URL } from './application';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      tags: [],
      activeEntry: {},
      error: '',
    };
  }

  componentWillMount() {
    axios.get(`${API_URL}/entry/`).then(response => {
      this.setState({ entries: response.data });
    })
    .catch(() => {
      this.setState({ error: 'There was an error loading the entries from the database ' });
    });

    axios.get(`${API_URL}/tag/`).then(response => {
      this.setState({ tags: response.data });
    })
    .catch(() => {
      this.setState({ error: 'There was an error loading tags from the database ' });
    });
  }

  showEntry(title) {
    const activeEntry = this.state.entries.find(entry => entry.title === title);
    if (activeEntry) {
      this.setState({ activeEntry });
    }
  }

  render() {
    const { entries, tags, activeEntry, error } = this.state;
    const entryItems = entries.map((entry, index) => (
      <div key={index} className="entry-item" onClick={() => this.showEntry(entry.title)}>
        <h4 className="entry-item-title">{entry.title}</h4>
        <div className="entry-item-description">{entry.description}</div>
        <div className="entry-item-tag-container">
          {entry.tags.map((id, i) => (
            <div key={i} className="entry-item-tag">{tags.find(tag => tag.id === id).name}</div>)
          )}
        </div>
      </div>
    ));

    return (
      <div id="main-container">      
        <div id="entry-container">
          {entryItems}
        </div>
        <div id="active-entry-container">
          {!activeEntry.content ? '' : 
            <div>
              <h2>{activeEntry.title}</h2>
              <h4>{activeEntry.description}</h4>
              <div id="content-container" dangerouslySetInnerHTML={{ __html: marked(activeEntry.content) }} />
            </div>
          }
        </div>
      </div>
    );
  }
}
