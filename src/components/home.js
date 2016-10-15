
import '../sass/home.scss';

import React, { Component } from 'react';
import { Card, CardTitle, CardMedia, CardText, CardHeader } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="home-container" key={Math.random()}>
        <MuiThemeProvider>
          <Card>
            <CardMedia
              overlay={
                <CardTitle
                  title="Manufacturing Software" 
                  subtitle="Concepts from conventional manufacturing to software design"
                />
              }
            >
              <div className="home-img-container"><img src="/resources/img/process.png" /></div>
            </CardMedia>
            <CardText>
              <div className="home-message">
                As I learn how to program and write software I try to apply my experience in my current line of work,
                manufacturing. Every day I see analogies between the two - design, maintenance, working in teams,
                building relationships with customers, and many others. Since I have started writing software to support
                manufacturing activities, it only makes sense to try and learn and improve both at the same time.
                <p></p>
                This site was originally set up as a sort of tagged, searchable journal
                to document different skills I have been learning. I decided to try and consolidate or <strong>reduce</strong>
                &nbsp;some of
                them into organized articles. I also use it to test out new technologies and host various projects.
                If you have any feedback I always appreciate it!
              </div>
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}
