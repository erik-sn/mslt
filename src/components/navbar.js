if (process.env.BROWSER) {
  require('../sass/navbar.scss');
}

import React, { Component } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
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
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.home = this.home.bind(this);
    this.admin = this.admin.bind(this);
    this.about = this.about.bind(this);
    this.portfolio = this.portfolio.bind(this);
    this.get = debounce(axios.get, 500);
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
    browserHistory.push('/about');
  }

  home() {
    browserHistory.push('/');
  }

  portfolio() {
    window.location.href = 'https://devreduce.com/portfolio';
  }

  about() {
    browserHistory.push('/about');
  }

  admin() {
    browserHistory.push('/admin');
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleUpdateInput(input) {
    axios.get(`${API_URL}/api/entry?filter=${input}`).then(response => {
      this.setState({ dataSource: response.data.map(entry => entry.title.substring(0, 20)) });
    });
  }

  render() {
    const { auth } = this.props;
    return (
      <div id="navbar-container" >
        <div className="main-tabs" >
          <MuiThemeProvider>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab label="home" value="a" onClick={this.home} />
              <Tab label="portfolio" value="b" onClick={this.portfolio} />
              <Tab label="about" value="c" onClick={this.about} />
            </Tabs>
          </MuiThemeProvider>
        </div>
        <div className="secondary-tabs">
          <div className="search-tab">
            <MuiThemeProvider>
              <AutoComplete
                hintText="Search..."
                filter={AutoComplete.noFilter}
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
                {auth && auth.isAdmin ? <MenuItem primaryText="Admin" onClick={this.admin} /> : ''}
                {auth ?
                  <MenuItem primaryText="Logout" onClick={this.logout} /> :
                  <MenuItem primaryText="Login" onClick={this.login} />
                }
              </IconMenu>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}
