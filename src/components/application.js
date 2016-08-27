if (process.env.BROWSER) {
  require('../sass/style.scss');
}

import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './navbar';
import Admin from './admin';
import Main from './main';

export const API_URL = 'http://localhost:8000/api';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      showAdmin: false,
      user: undefined,
      entries: [],
      tags: [],
      activeEntry: {},
      error: '',
    };
  }

  componentWillMount() {
    axios.get(`${API_URL}/entry/`).then(response => this.setState({ entries: response.data }))
    .catch(() => this.setState({ error: 'There was an error loading the entries from the database ' }));

    axios.get(`${API_URL}/tag/`).then(response => this.setState({ tags: response.data }))
    .catch(() => this.setState({ error: 'There was an error loading tags from the database ' }));

    const url = window.location.href;
    const code = /code=([^&]+)/.exec(url);
    if (code) {
      axios.get(`${API_URL}/auth/mslt/${code[1]}/`)
      .then(response => this.setState({ user: response.data, isAdmin: response.data.admin }))
      .catch(() => this.setState({ error: 'There was an error logging in through Github.' }));
    }
  }

  showEntry(title) {
    const activeEntry = this.state.entries.find(entry => entry.title === title);
    if (activeEntry) {
      this.setState({ activeEntry });
    }
  }

  render() {
    const { entries, tags, activeEntry, showAdmin, isAdmin, user, error } = this.state;
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
      <div id="app-container">
        <Navbar
          isAdmin={isAdmin}
          user={user}
          logout={() => this.setState({ user: undefined, isAdmin: false })}
          toggleAdmin={() => this.setState({ showAdmin: !this.state.showAdmin })}
        />
        <div id="main-container">
          <div id="entry-container">
            {entryItems}
          </div>
          <div id="active-entry-container">
            {showAdmin ?
              <Admin resetActive={() => this.setState({ activeEntry: {} })} activeEntry={activeEntry} /> :
              <Main activeEntry={activeEntry} />
            }
          </div>
        </div>
      </div>
    );
  }
}
