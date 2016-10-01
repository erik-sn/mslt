if (process.env.BROWSER) {
  require('../sass/style.scss');
  require('../sass/main.scss');
}

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import marked from 'marked';
import Chip from 'material-ui/Chip';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('es6-promise').polyfill();

import Navbar from './navbar';
import Admin from './admin';
import Main from './main';
import ConnectBar from './connect_bar';

// export const API_URL = 'http://localhost:8000';
export const API_URL = 'https://devreduce.com';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAdmin: false,
      loading: false,
      auth: undefined,
      entries: [],
      activeEntry: undefined,
      error: '',
    };
    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {    
    this.checkIfAdmin(this.props.params);
    if (this.props.params.title) {
      this.fetchPost(this.props.params.title);
    }
  }

  componentDidMount() {
    // retrieve entries from database and convert their tag objects into strings of names
    axios.get(`${API_URL}/api/entry/`).then(response => this.setState({
      entries: response.data,
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
    this.checkIfAdmin(newProps.params);
    if (newProps.params.title !== this.props.params.title) {
      this.fetchPost(newProps.params.title);
    }
  }

  checkIfAdmin(params) {
    const { auth } = this.state;
    if (auth && auth.isAdmin && params.title === 'admin') {
      this.setState({ showAdmin: true });
      return;
    } else if (params.title === 'admin') {
      browserHistory.push('/');
    }
    this.setState({ showAdmin: false });
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

  navigate(url) {
    const cleanedTitle = url.toLowerCase().replace(/ /g, '-');
    browserHistory.push(`/${cleanedTitle}`);
  }

  renderTags(entry) {
    return entry.tags.map((tag, i) => <Chip key={i}>{tag.name}</Chip>);
  }

  renderEntryItems(entries) {
    return entries.map((entry, index) => {
      this.renderTags(entry);
      return (
        <div key={index} className="entry-item" onClick={this.navigate.bind(this, entry.title)} >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                title={entry.title}
                subtitle={entry.description}
              />
            </Card>
          </MuiThemeProvider>
          <div className="tag-container">
              {entry.tags.map((tag, i) => (<MuiThemeProvider><Chip key={i}>{tag.name}</Chip></MuiThemeProvider>))}
          </div>
        </div>
      );
    });
  }

  renderEntry(entry) {
    const headerStyle = { padding: '10px 50px' };
    const textStyle = { padding: '10px 50px' };

    return (
      <div className="entry-display" >
        <MuiThemeProvider>
          <Card>
            <div className="tag-container">
              {entry.tags.map((tag, i) => (<MuiThemeProvider><Chip key={i}>{tag.name}</Chip></MuiThemeProvider>))}
            </div>
            <CardHeader
              style={headerStyle}
              title={entry.title}
              subtitle={entry.description}
            />
            <CardText
              style={textStyle}
              dangerouslySetInnerHTML={{ __html: marked(entry.content) }} 
            />
            
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }

  render() {
    const { entries, activeEntry, auth, showAdmin } = this.state;
    return (
      <div id="app-container">
        <ConnectBar />
        <div id="main-container">
          <Navbar
            auth={auth}
            logout={() => this.setState({ showAdmin: false, auth: undefined })}
            toggleAdmin={() => this.setState({ showAdmin: !this.state.showAdmin })}
            activeEntry={activeEntry}
            setActiveEntry={(entry) => this.setState({ activeEntry: entry })}
          />
          {showAdmin ? <Admin auth={auth} activeEntry={activeEntry} render={this.renderEntry} /> :
            <div id="post-container">
              {activeEntry ? this.renderEntry(activeEntry) : this.renderEntryItems(entries)}
            </div>
          }
        </div>
      </div>
    );
  }
}
