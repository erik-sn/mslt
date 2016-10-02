if (process.env.BROWSER) {
  require('../sass/admin.scss');
}

import React, { Component } from 'react';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { API_URL } from './application';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeEntry: {
        id: 0,
        owner: props.auth.id,
        token: '',
        title: '',
        description: '',
        content: '',
        tags: [],
      },
      output: '',
      token: props.auth && props.auth.access_token ? `?access_token=${props.auth.access_token}` : '',
      tagString: '',  // separate to improve transfer from tag strings to tag objects in entry
    };
  }

  componentWillReceiveProps(nextProps) {
    const { activeEntry, auth } = nextProps;
    const token = auth && auth.access_token ? `?access_token=${auth.access_token}` : '';
    if (activeEntry) {
      console.log(activeEntry);
      this.setState({ activeEntry, token });
    } else {
      this.setState({ token });
    }
  }

  postEntry() {
    const { token, activeEntry } = this.state;
    activeEntry.owner = this.props.auth.id;
    axios.post(`${API_URL}/api/entry/${token}`, activeEntry)
    .then(() => this.setState({ status: 'Successfully posted entry to database' }))
    .then(() => this.clearForm())
    .catch(() => this.setState({ error: 'There was an error posting entry to the database' }));
  }

  updateEntry() {
    const { token, activeEntry } = this.state;
    console.log(activeEntry);
    activeEntry.owner = this.props.auth.id; // update owner to current user
    axios.put(`${API_URL}/api/entry/${token}`, activeEntry)
    .then(() => this.setState({ status: 'Successfully edited entry to database' }))
    .then(() => this.clearForm())
    .catch(() => this.setState({ error: 'There was an error posting entry to the database' }));
  }

  deleteEntry(id) {
    axios.delete(`${API_URL}/api/entry/${this.state.token}`, { id })
    .then(() => this.setState({ status: 'Successfully deleted entry from the database' }))
    .catch(() => this.setState({ error: 'There was an error deleting the entry from the database' }));
  }

  updateField(e, name) {
    localStorage.setItem(`mslt-${name}`, JSON.stringify(e.target.value));
    const activeEntry = cloneDeep(this.state.activeEntry);
    activeEntry[name] = e.target.value;
    this.setState({ activeEntry });
  }

  updateTags({ value }) {
    localStorage.setItem('mslt-tags', JSON.stringify(value));
    const activeEntry = this.state.activeEntry;
    activeEntry.tags = value.split(', ').map(tag => tag.trim());
    this.setState({ activeEntry });
  }

  clearForm() {
    const activeEntry = {
      id: 0,
      owner: this.state.activeEntry.owner,
      title: '',
      description: '',
      content: '',
      tags: [],
    };
    this.setState({ activeEntry }, () => this.props.resetActive(activeEntry));
  }

  render() {
    const { id, title, description, content, tags } = this.state.activeEntry;
    console.log(tags.map(tag => tag.name));
    return (
      <div id="admin-container" >
        <div id="input-container">
          <div><input value={title} onChange={e => this.updateField(e, 'title')} placeholder="Enter title here..." className="admin-input" type="text" /></div>
          <div><input value={description} onChange={e => this.updateField(e, 'description')} placeholder="Enter description here..." className="admin-input" type="text" /></div>
          <textarea id="input-content" value={content} onChange={e => this.updateField(e, 'content')} />
          <div>Tags:</div>
          <div id="tag-container"><input className="admin-input" value={tags.length > 0 ? tags.map(tag => tag.name).join(', ') : ''} onChange={e => this.updateTags(e.target)} /></div>
          <div id="button-container">
            {id ? <MuiThemeProvider><FlatButton onClick={() => this.updateEntry()} label="Update" /></MuiThemeProvider>
                            : <MuiThemeProvider><FlatButton onClick={() => this.postEntry()} label="Submit" /></MuiThemeProvider>}
            <MuiThemeProvider><FlatButton onClick={() => this.clearForm()} label="Cancel" /></MuiThemeProvider>
          </div>
        </div>
        <div id="preview-container">
          {this.props.render(this.state.activeEntry)}
        </div>
      </div>
    );
  }
}