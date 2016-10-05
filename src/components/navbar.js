if (process.env.BROWSER) {
  require('../sass/navbar.scss');
}

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { debounce } from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { API_URL } from './application';
import { eraseCookie, readCookie } from '../../src/utility/functions';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.clientId = '72cf5f6567a4f2de102c';

    this.state = {
      nav: props.params ? props.params.title : 'home',
      dataSource: [],
      searchText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSearchSelect = this.handleSearchSelect.bind(this);
    this.updateSearchMenu = debounce(this.updateSearchMenu, 300);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const tabs = ['home', 'portfolio', 'about'];
    if (nextProps.params && tabs.indexOf(nextProps.params.title) === -1) {
      this.setState({ nav: 'home' });
    } else if (nextProps.params) {
      this.setState({ nav: nextProps.params.title });
    }
  }
  

  /**
   * Redirect the user to github to begin authentication procedure
   */
  login() {
    const auth = JSON.parse(readCookie('devreduceauth'));
    if (auth) {
      this.props.setAuth(auth);
    } else {
      window.open(`https://github.com/login/oauth/authorize?redirect_uri=http://localhost:3000&client_id=${this.clientId}`, '_self');
    }
  }

  logout() {
    const { auth, logout } = this.props;
    axios.post(`${API_URL}/api/logout/?client_id=${this.clientId}&access_token=${auth.access_token}`,
    { client_id: this.clientId, access_token: auth.access_token }).then(() => {
      browserHistory.push('/');
      eraseCookie('devreduceauth');
      logout();
    });
  }

  admin() {
    browserHistory.push('/admin');
  }

  handleChange(value) {
    this.setState({ nav: value });
  }

  handleUpdateInput(searchText) {
    if (searchText.trim() === '') {
      this.setState({ searchText, dataSource: [] });
    } else {
      this.setState({ searchText }, this.updateSearchMenu(searchText));
    }
  }

  updateSearchMenu(searchText) {
    const menuStyle = { fontSize: '12px' };
    const token = this.props.auth ? `&access_token=${this.props.auth.access_token}` : '';
    axios.get(`${API_URL}/api/entry?filter=${searchText}${token}`).then(response => {
      const menus = response.data.map(entry => (
        {
          entry,
          text: entry.title,
          value: (
            <MenuItem
              primaryText={entry.title}
              style={menuStyle}
            />
          ),
        }
      ));
      this.setState({ dataSource: menus });
    });
  }

  handleSearchSelect(chosenRequest) {
    this.props.setActiveEntry(chosenRequest.entry);
    this.setState({ searchText: '' });
  }

  render() {
    const { auth } = this.props;
    const menuStyle = { fontSize: '12px' };
    return (
      <div id="navbar-container" >
        <div className="main-tabs" >
          <MuiThemeProvider>
            <Tabs
              value={this.state.nav}
              onChange={this.handleChange}
            >
              <Tab label="home" value="home" onClick={() => browserHistory.push('/')} />
              <Tab label="portfolio" value="portfolio" onClick={() => browserHistory.push('/portfolio')}/>
              <Tab label="about" value="about" onClick={() => browserHistory.push('/about')} />
            </Tabs>
          </MuiThemeProvider>
        </div>
        <div className="secondary-tabs">
          <div className="search-tab">
            <MuiThemeProvider>
              <AutoComplete
                searchText={this.state.searchText}
                hintText="Search..."
                filter={AutoComplete.noFilter}
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleSearchSelect}
                menuStyle={menuStyle}
                maxSearchResults={15}
                fullWidth
              />
            </MuiThemeProvider>
          </div>
          <div className="menu-tab">
            <MuiThemeProvider>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem key={Math.random()} primaryText="Search" />
                <MenuItem key={Math.random()} primaryText="Filter" />
                <MenuItem key={Math.random()} primaryText="Settings" />
                <MenuItem key={Math.random()} primaryText="Help" />
                {auth && auth.isAdmin ? <MenuItem key={Math.random()} primaryText="Admin" onClick={() => browserHistory.push('/admin')} /> : ''}
                {auth ?
                  <MenuItem key={Math.random()} primaryText="Logout" onClick={this.logout} /> :
                  <MenuItem key={Math.random()} primaryText="Login" onClick={this.login} />
                }
              </IconMenu>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}
