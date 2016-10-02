if (process.env.BROWSER) {
  require('../sass/style.scss');
  require('../sass/main.scss');
  require('../sass/entry.scss');
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
import ConnectBar from './connect_bar';
import { createCookie, readCookie, eraseCookie } from '../../src/utility/functions';

// export const API_URL = 'http://localhost:8000';
export const API_URL = 'https://devreduce.com';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.clientId = '72cf5f6567a4f2de102c';
    this.state = {
      showAdmin: false,
      loading: false,
      auth: undefined,
      entries: [],
      activeEntry: undefined,
      error: '',
    };
    this.navigate = this.navigate.bind(this);

    this.headerStyle = {
      paddingRight: '50px',
      padding: '20px 50px',
      boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 2px 8px, rgba(0, 0, 0, 0.117647) 0px 2px 6px',
      margin: '10px -10px 0px -10px',
      background: 'white',
    };
    this.titleStyle = { fontWeight: 'bold', fontSize: '1.35rem' };
    this.subTitleStyle = { fontSize: '1.15rem' };
    this.textStyle = { padding: '10px 50px', fontSize: '1.1rem', color: '#333' };
    this.divideStyle = { width: 'calc(100% - 100px)', marginLeft: '50px' };
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
        window.history.pushState('', '', `/${value}`);
        createCookie('devreduceauth', JSON.stringify(response.data), 60);
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
      const cookie = JSON.parse(readCookie('devreduceauth'));
      if (cookie) {
        this.setState({ auth: cookie, showAdmin: cookie.isAdmin });
      }
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
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
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

    return (
      <div className="entry-display" >
        <MuiThemeProvider>
          <Card>
            <div className="tag-container">
              {entry.tags.map((tag, i) => (<MuiThemeProvider key={i}><Chip>{tag.name}</Chip></MuiThemeProvider>))}
            </div>
            <CardHeader
              style={this.headerStyle}
              titleStyle={this.titleStyle}
              subtitleStyle={this.subTitleStyle}
              title={entry.title}
              subtitle={entry.description}
            />
            <CardText
              className="entry-body"
              style={this.textStyle}
              dangerouslySetInnerHTML={{ __html: marked(entry.content) }} 
            />
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }

  render() {
    const { entries, activeEntry, auth, showAdmin } = this.state;
    const adminStyle = { width: '100%', maxWidth: '100%' };
    return (
      <div id="app-container">
        <div id="reduce-container">
          <div className="reduce-item">experience.<b>reduce</b>((blog, post) => blog + post)), ‘’);</div>
        </div>
        <ConnectBar />
        <div id="main-container" style={showAdmin ? adminStyle : {}} >
          <Navbar
            setAuth={(newAuth) => this.setState({ auth: newAuth })}
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
