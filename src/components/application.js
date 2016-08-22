if (process.env.BROWSER) {
  require('../sass/style.scss');
}

import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'https://kiresuah.me/api';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      tags: [],
      activeEntry: {},
      error: '',
    };
    this.showEntry = this.showEntry.bind(this);
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

  postEntry(title, description, content, tags) {
    axios.post(`${API_URL}/entry/`, { title, description, content, tags })
    .then(() => this.setState({ status: 'Successfully posted entry to database' }))
    .catch(() => this.setState({ error: 'There was an error posting entry to the database' }));
  }

  editEntry(title, description, content, tags) {
    axios.put(`${API_URL}/entry/`, { title, description, content, tags })
    .then(() => this.setState({ status: 'Successfully edited entry to database' }))
    .catch(() => this.setState({ error: 'There was an error posting entry to the database' }));
  }

  showEntry(title) {
    axios.get(`${API_URL}/entry/${title}/`)
    .then(response => this.setState({ activeEntry: response.data }))
    .catch(() => this.setState({ error: 'There was an error retrieving the entry from the database' }));
  }

  render() {
    const { entries, activeEntry } = this.state;
    const entryItems = entries.map((entry, index) => (
      <div key={index} className="entry-item" onClick={() => this.showEntry(entry.title)}>
        <h4 className="entry-item-title">{entry.title}</h4>
        <div className="entry-item-description">{entry.description}</div>
        <div className="entry-item-content">{entry.content}</div>
      </div>
    ));

    return (
      <div id="app-container">
        <div id="navbar-container">

        </div>
        <div id="main-container">
          <div id="entry-container">
            {entryItems}
          </div>
          <div id="active-entry-container">
            {activeEntry.title}
          </div>
        </div>
      </div>
    );
  }
}
