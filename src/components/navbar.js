if (process.env.BROWSER) {
  require('../sass/navbar.scss');
}

import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import AutoComplete from 'material-ui/AutoComplete';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { API_URL } from './application';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.clientId = '72cf5f6567a4f2de102c';

    this.state = {
      value: 'a',
      dataSource: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.home = this.home.bind(this);
    this.portfolio = this.portfolio.bind(this);
  }

  /**
   * Redirect the user to github to begin authentication procedure
   */
  login() {
    window.open(`https://github.com/login/oauth/authorize?redirect_uri=http://localhost:3000&client_id=${this.clientId}`, '_self');
  }

  logout() {
    const { auth, logout } = this.props;
    axios.post(`${API_URL}/api/logout/?client_id=${this.clientId}&access_token=${auth.access_token}`,
    { client_id: this.clientId, access_token: auth.access_token });
    logout();
  }

  home() {
    browserHistory.push('/');
  }

  portfolio() {
    window.location.href = 'https://kiresuah.me/portfolio';
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {

    return (
      <div id="navbar-container" >
        <div className="main-tabs" >
          <MuiThemeProvider>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label="home" value="a" />
              <Tab label="portfolio" value="b" />
              <Tab label="about" value="c" />
            </Tabs>
          </MuiThemeProvider>
        </div>
        <div className="secondary-tabs">
          <div className="search-tab">
            <MuiThemeProvider>
              <AutoComplete
                hintText="Search for posts..."
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
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
                <MenuItem primaryText="Search" />
                <MenuItem primaryText="Filter" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Login" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}
