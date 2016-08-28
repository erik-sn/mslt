if (process.env.BROWSER) {
  require('../sass/admin.scss');
}

import React, { Component } from 'react';
import axios from 'axios';
import marked from 'marked';

import { API_URL } from './application';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeEntry: {
        id: -1,
        token: '',
        title: (JSON.parse(localStorage.getItem('mslt-title')) || ''),
        description: (JSON.parse(localStorage.getItem('mslt-description')) || ''),
        content: (JSON.parse(localStorage.getItem('mslt-content')) || ''),
        tags: (JSON.parse(localStorage.getItem('mslt-tags')) || []),
      },
      output: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { activeEntry, auth } = nextProps;
    const token = auth && auth.access_token ? `?access_token=${auth.access_token}` : '';
    this.setState({ activeEntry, token });
  }

  postEntry() {
    const form = this.state.activeEntry;
    form.tags = form.tags.split(',').map(tag => tag.trim());
    axios.post(`${API_URL}/entry/${this.state.token}`, form)
    .then(() => this.setState({ status: 'Successfully posted entry to database' }))
    .catch(() => this.setState({ error: 'There was an error posting entry to the database' }));
  }

  updateEntry() {
    const form = this.state.activeEntry;
    form.tags = form.tags.split(',').map(tag => tag.trim());
    axios.put(`${API_URL}/entry/${this.state.token}`, form)
    .then(() => this.setState({ status: 'Successfully edited entry to database' }))
    .catch(() => this.setState({ error: 'There was an error posting entry to the database' }));
  }

  deleteEntry(id) {
    axios.delete(`${API_URL}/entry/${this.state.token}`, { id })
    .then(() => this.setState({ status: 'Successfully deleted entry from the database' }))
    .catch(() => this.setState({ error: 'There was an error deleting the entry from the database' }));
  }

  updateField(e, name) {
    localStorage.setItem(`mslt-${name}`, JSON.stringify(e.target.value));
    const activeEntry = this.state.activeEntry;
    activeEntry[name] = e.target.value;
    this.setState({ activeEntry });
  }

  clearForm() {
    const activeEntry = {
      id: -1,
      title: '',
      description: '',
      content: '',
      tags: '',
    };
    this.setState({ activeEntry });
    this.props.resetActive();
  }

  render() {
    const { activeEntry } = this.props;
    const { title, description, content, tags } = this.state.activeEntry;
    return (
      <div id="admin-container" >
        <div id="input-container">
          <div><input value={title} onChange={e => this.updateField(e, 'title')} placeholder="Enter title here..." className="admin-input" type="text" /></div>
          <div><input value={description} onChange={e => this.updateField(e, 'description')} placeholder="Enter description here..." className="admin-input" type="text" /></div>
          <textarea id="input-content" value={content} onChange={e => this.updateField(e, 'content')} />
          <div>Tags:</div>
          <div id="tag-container"><input className="admin-input" value={tags} onChange={e => this.updateField(e, 'tags')} /></div>
          <div id="button-container">
            {activeEntry.id ? <button onClick={() => this.updateEntry()}>Update</button>
                            : <button onClick={() => this.postEntry()}>Submit</button>}
            <button onClick={() => this.clearForm()}>Cancel</button>
          </div>
        </div>
        <div id="preview-container">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>
      </div>
    );
  }
}