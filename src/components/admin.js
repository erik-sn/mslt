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
      form: {
        title: (JSON.parse(localStorage.getItem('mslt-title')) || ''),
        description: (JSON.parse(localStorage.getItem('mslt-description')) || ''),
        content: (JSON.parse(localStorage.getItem('mslt-content')) || ''),
        tags: (JSON.parse(localStorage.getItem('mslt-tags')) || []),
      },
      output: '',
    };
  }

  postEntry() {
    const form = this.state.form;
    console.log(form);
    form.tags = form.tags.split(',').map(tag => tag.trim());
    console.log(form);
    axios.post(`${API_URL}/entry/`, form)
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

  updateField(e, name) {
    localStorage.setItem(`mslt-${name}`, JSON.stringify(e.target.value));
    const form = this.state.form;
    form[name] = e.target.value;
    this.setState({ form });
  }

  render() {
    const { title, description, content, tags } = this.state.form;
    return (
      <div id="admin-container" >
        <div id="input-container">
          <div><input value={title} onChange={e => this.updateField(e, 'title')} placeholder="Enter title here..." className="admin-input" type="text" /></div>
          <div><input value={description} onChange={e => this.updateField(e, 'description')} placeholder="Enter description here..." className="admin-input" type="text" /></div>
          <textarea id="input-content" value={content} onChange={e => this.updateField(e, 'content')} />
          <div id="tag-container"><input className="admin-input" value={tags} onChange={e => this.updateField(e, 'tags')} /></div>
          <div id="button-container">
            <button onClick={() => this.postEntry()}>Submit</button>
          </div>
        </div>
        <div id="preview-container">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>
      </div>
    );
  }
}