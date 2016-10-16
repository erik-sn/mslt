if (process.env.BROWSER) {
  require('../sass/style.scss');
  require('../sass/main.scss');
  require('../sass/entry.scss');
}

import '../sass/articles.scss';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import marked from 'marked';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('es6-promise').polyfill();

import Navbar from './navbar';
import Admin from './admin';
import ConnectBar from './connect_bar';
import Portfolio from './portfolio';
import About from './about';
import Home from './home';
import { createCookie, readCookie } from '../../src/utility/functions';

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

    this.headerStyle = {
      padding: '20px 0px 20px 50px',
      boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 2px 8px, rgba(0, 0, 0, 0.117647) 0px 2px 6px',
      margin: '10px -10px 0px -10px',
      background: 'white',
    };
    this.titleStyle = { fontWeight: 'bold', fontSize: '1.35rem' };
    this.subTitleStyle = { fontSize: '1.15rem' };
  }

  componentDidMount() {
    const url = window.location.href;
    const code = /code=([^&]+)/.exec(url);
    if (code) {
      axios.get(`${API_URL}/api/login/${code[1]}/`)
      .then(response => {
        const value = window.location.href.substring(url.lastIndexOf('/') + 1).split('?')[0];
        window.history.pushState('', '', `/${value}`);
        createCookie('devreduceauth', JSON.stringify(response.data), 15);
        this.setState({ auth: response.data }, () => this.fetchEntries());
      })
      .catch(() => this.setState({ error: 'There was an error logging in through Github.' }));
    } else {
      this.fetchPost(this.props.params.title);
      this.fetchEntries();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.routeView(nextProps.params.title);
  }

  routeView(title) {
    const { entries, activeEntry, auth } = this.state;
    switch (title) {
      case 'admin':
        return <Admin showAdmin={this.checkIfAdmin()} auth={auth} activeEntry={activeEntry} render={this.renderEntry} />;
      case 'portfolio':
        return <Portfolio />;
      case 'about':
        return <About />;
      case 'articles':
        return <div id="article-container">{this.renderEntryItems(entries)}</div>;
      case undefined:
      case '':
        return <Home />;
      default:
        return <div id="article-container">{this.renderEntry(activeEntry)}</div>;
    }
  }

  checkIfAdmin() {
    const { auth } = this.state;
    if (auth && auth.isAdmin) {
      return true;
    }
    const cookie = JSON.parse(readCookie('devreduceauth'));
    if (cookie) {
      this.setState({ auth: cookie });
      return cookie.isAdmin;
    }
    return false;
  }

  navigate(url) {
    const cleanedTitle = url.toLowerCase().replace(/ /g, '-');
    this.fetchPost(cleanedTitle).then(() => {
      browserHistory.push(`/${cleanedTitle}`);
    });
  }

  fetchEntries() {
    // retrieve entries from database and convert their tag objects into strings of names
    const token = this.state.auth ? `?access_token=${this.state.auth.access_token}` : '';
    axios.get(`${API_URL}/api/entry/${token}`).then(response => this.setState({
      entries: response.data,
    }))
    .catch(() => this.setState({
      error: 'There was an error loading the entries from the database ',
    }))
    .then(() => this.routeView(this.props.params.title));
  }

  fetchPost(title) {
    this.setState({ loading: true });
    const token = this.state.auth ? `?access_token=${this.state.auth.access_token}` : '';
    return Promise.resolve(axios.get(`${API_URL}/api/entry/${title}/${token}`)
    .then(response => {
      this.setState({ activeEntry: response.data[0] });
    })
    .catch(() => this.setState({
      error: 'There was an error retrieving the post from the database',
    }))
    .then(() => this.setState({ loading: false })));
  }

  renderTags(entry) {
    return entry.tags.map((tag, i) => <Chip key={i}>{tag.name}</Chip>);
  }

  renderEntryItems(entries) {
    const monthCards = [];
    const monthlyEntries = this.sortArticlesByMonth(entries);
    for (const month in monthlyEntries) {
      if (monthlyEntries.hasOwnProperty(month)) {
        monthCards.push(
          <div className="article-month-container" key={Math.random()}>
            <MuiThemeProvider>
              <Card>
                <CardHeader
                  title={moment(monthlyEntries[month][0].created).format('MMMM YYYY')}
                  titleStyle={this.titleStyle}
                >
                {monthlyEntries[month].map((article, i) => this.renderMonthlyArticle(article, i))}
                </CardHeader>
              </Card>
            </MuiThemeProvider>
          </div>
        );
      }
    }
    return monthCards;
  }

  renderMonthlyArticle(article, index) {
    return (
      <div
        key={index}
        className="article-container"
        onClick={this.navigate.bind(this, article.title)}
      >
        <div className="article-title">{article.title}</div>
        <div className="article-date">{moment(article.created).format('MMMM D, YY')}</div>
      </div>
    );
  }

  sortArticlesByMonth(articles) {
    return articles.reduce((sorted, article) => {
      const month = article.created.substring(0, 7);
      if (sorted.hasOwnProperty(month)) {
        sorted[month].push(article);
      } else {
        sorted[month] = [article];
      }
      return sorted;
    }, {});
  }

  renderEntry(entry) {
    if (!entry) {
      return <div className="entry-display" />;
    }
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
              className="rendered-article-header"
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
    const { activeEntry, auth } = this.state;
    const adminStyle = { width: '100%', maxWidth: '100%' };
    return (
      <div id="app-container">
        <ConnectBar />
        <div id="main-container" style={this.props.params.title === 'admin' ? adminStyle : {}} >
          <Navbar
            params={this.props.params}
            setAuth={(newAuth) => this.setState({ auth: newAuth }, () => this.fetchEntries())}
            auth={auth}
            logout={() => this.setState({ showAdmin: false, auth: undefined })}
            toggleAdmin={() => this.setState({ showAdmin: !this.state.showAdmin })}
            activeEntry={activeEntry}
            setActiveEntry={entry => this.setState({ activeEntry: entry })}
          />
          {this.routeView(this.props.params.title)}
        </div>
      </div>
    );
  }
}
