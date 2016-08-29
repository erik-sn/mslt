if (process.env.BROWSER) {
  require('../sass/style.scss');
  require('../sass/main.scss');
}

import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './navbar';
import Admin from './admin';
import Main from './main';

// export const API_URL = 'http://localhost:8000';
export const API_URL = 'https://kiresuah.me';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAdmin: false,
      auth: undefined,
      entries: [],
      activeEntry: {},
      error: '',
    };
  }

  componentWillMount() {
    // retrieve entries from database and convert their tag objects into strings of names
    axios.get(`${API_URL}/api/entry/`).then(response => this.setState({ 
      entries: this.formatTags(response.data),
    }))
    .catch(() => this.setState({
      error: 'There was an error loading the entries from the database ',
    }));

    const url = window.location.href;
    const code = /code=([^&]+)/.exec(url);
    if (code) {
      axios.get(`${API_URL}/api/login/${code[1]}/`)
      .then(response => {
        const value = window.location.href.substring(url.lastIndexOf('/') + 1).split('?')[0];
        window.history.pushState('', '', '/' + value);
        this.setState({ auth: response.data });
      })
      .catch(() => this.setState({ error: 'There was an error logging in through Github.' }));
    }
  }

  formatTags(entries) {
    return entries.map(entry => {
      entry.tags = entry.tags.map(tag => tag.name);
      return entry;
    });
  }

  showEntry(title) {
    const { entries } = this.state;
    const activeEntry = entries.find(entry => entry.title === title);
    if (activeEntry) {
      this.setState({ activeEntry });
    }
  }

  render() {
    const { entries, activeEntry, showAdmin, auth, error } = this.state;
    if (!entries) {
      return <h1>Loading...</h1>;
    }

    const entryItems = entries.map((entry, index) => {
      return (
        <div key={index} className="entry-item" onClick={() => this.showEntry(entry.title)}>
          <h4 className="entry-item-title">{entry.title}</h4>
          <div className="entry-item-description">{entry.description}</div>
          <div className="entry-item-tag-container">{entry.tags.map((tag, i) => (
            <div key={i} className="entry-item-tag">{tag}</div>
          ))}
          </div>
        </div>
      );
    });

    return (
      <div id="app-container">
        <Navbar
          auth={auth}
          logout={() => this.setState({ showAdmin: false, auth: undefined })}
          toggleAdmin={() => this.setState({ showAdmin: !this.state.showAdmin })}
          activeEntry={activeEntry}
        />
        <div id="main-container">
          <div id="entry-container">
            {entryItems}
          </div>
          <div id="active-entry-container">
            {showAdmin ?
              <Admin auth={auth} resetActive={clearEntry => this.setState({ activeEntry: clearEntry })} activeEntry={activeEntry} /> :
              <Main activeEntry={activeEntry} />
            }
          </div>
        </div>
      </div>
    );
  }
}
