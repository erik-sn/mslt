if (process.env.BROWSER) {
  require('../sass/admin.scss');
}

import React, { Component } from 'react';
import axios from 'axios';
import marked from 'marked';

import { API_URL } from './application';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: '',
    };
  }

  postEntry(title, description, content, tags) {
    axios.post(`${API_URL}/entry/`, { title, description, content, tags })
    .then(() => this.setState({ status: 'Successfully posted entry to database' }))
    .catch(() => this.setState({ error: 'There was an error posting entry to the database' }));
  }

  editEntry(id, title, description, content, tags) {
    axios.put(`${API_URL}/entry/`, { id, title, description, content, tags })
    .then(() => this.setState({ status: 'Successfully edited entry to database' }))
    .catch(() => this.setState({ error: 'There was an error posting entry to the database' }));
  }

  deleteEntry(id) {
    axios.delete(`${API_URL}/entry/`, { id })
    .then(() => this.setState({ status: 'Successfully deleted entry from the database' }))
    .catch(() => this.setState({ error: 'There was an error deleting the entry from the database' }));
  }

  render() {
    const { input } = this.state;
    return (
      <div id="admin-container" >
        <div id="input-container">
          <textarea id="input-text" value={input} onChange={(e) => this.setState({ input: e.target.value })} />
        </div>
        <div id="output-container">
          <div dangerouslySetInnerHTML={{ __html: marked(input) }} />
        </div>
      </div>
    );
  }
}