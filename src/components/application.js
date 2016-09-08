if (process.env.BROWSER) {
  require('../sass/style.scss');
  require('../sass/main.scss');
}

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
require('es6-promise').polyfill();

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
      loading: false,
      auth: undefined,
      entries: [],
      activeEntry: {},
      error: '',
      showMin: false,
    };
  }

  componentWillMount() {
    if (this.props.params.title) {
      this.fetchPost(this.props.params.title);
    }
    if (window.innerHeight <= 500) {
      this.setState({ showMin: true });
    }    
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.checkWindowSize());
    this.checkWindowSize();

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

  componentWillReceiveProps(newProps) {
    if (newProps.params.title !== this.props.params.title) {
      this.fetchPost(newProps.params.title);
    }
  }

  checkWindowSize() {
    const navbarContainer = document.querySelector('#navbar-container');
    const entryContainer = document.querySelector('#entry-container');
    const postContainer = document.querySelector('#post-container');

    // check to see if we should render minimum mode instead of full mode
    if (window.innerWidth <= 500 && !this.state.showMin) {
      this.setState({ showMin: true });
    } else if (window.innerWidth > 500 && this.state.showMin) {
      this.setState({ showMin: false });
    }

    if (entryContainer.offsetWidth < 225) {
      navbarContainer.style.height = '285px';
      postContainer.style.height = `${window.innerHeight - 300}px`;
    } else {
      navbarContainer.style.height = '165px';
      postContainer.style.height = `${window.innerHeight - 190}px`;
    }
  }

  fetchPost(title) {
    this.setState({ loading: true });
    axios.get(`${API_URL}/api/entry/${title}/`)
    .then(response => this.setState({ activeEntry: response.data[0] }))
    .catch(() => this.setState({
      error: 'There was an error retrieving the post from the database',
    }))
    .then(() => this.setState({ loading: false }));
  }

  formatTags(entries) {
    return entries.map(entry => {
      entry.tags = entry.tags.map(tag => tag.name);
      return entry;
    });
  }

  showEntry(title) {
    const cleanedTitle = title.toLowerCase().replace(/ /g, '_');
    browserHistory.push(`/${cleanedTitle}`);
  }

  getScreen() {
    const { activeEntry, auth, error, loading, showAdmin } = this.state;
    if (error) {
      return <div><h2>Error</h2><div>{error}</div></div>;
    } else if (loading) {
      return <div><h1>Loading!</h1></div>;
    } else if (showAdmin) {
      return (
        <Admin
          auth={auth}
          resetActive={clearEntry => this.setState({ activeEntry: clearEntry })}
          activeEntry={activeEntry}
        />
      );
    }
    return <Main activeEntry={activeEntry} />;
  }

  render() {
    const { entries, activeEntry, auth, showMin } = this.state;
    if (!entries) {
      return <h1>Loading...</h1>;
    }

    const entryItems = entries.map((entry, index) => {
      return (
        <div key={index} className="entry-item" onClick={() => this.showEntry(entry.title)}>
          <div className="entry-item-title">
            <h4>{entry.title}</h4>
          </div>
          <div className="entry-item-tag-container">{entry.tags.map((tag, i) => (
            <div key={i} className="entry-item-tag">{tag}</div>
          ))}
          </div>
        </div>
      );
    });
    console.log(showMin)
    return (
      <div id="app-container">
        <div id="main-container">
          <div id="entry-container" style={{ display: showMin ? 'none' : 'block' }}>
            <Navbar
              auth={auth}
              logout={() => this.setState({ showAdmin: false, auth: undefined })}
              toggleAdmin={() => this.setState({ showAdmin: !this.state.showAdmin })}
              activeEntry={activeEntry}
            />
            <div id="post-container">
              {entryItems}
            </div>
          </div>
          <div id="active-entry-container">
            {this.getScreen()}
          </div>
        </div>
      </div>
    );
  }
}
