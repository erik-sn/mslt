if (process.env.BROWSER) {
  require('../sass/about.scss');
}

import React, { Component } from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div id="about-container" >
        <MuiThemeProvider>
          <Card>
            <div className="about-inner-container">
              <div className="about-img-container">
                <Card><img src="../../src/img/profile.png" /></Card>
              </div>
              <div className="about-text-container">
                My name is Erik, I am a mechanical/process engineer living in South Carolina. 
                My interest in programming is to develop further  insight into manufacturing 
                processes - and display that insight through intuitive and efficient web design. 
                I have experience with Javascript - <a href="https://facebook.github.io/react/">React.js</a> & <a href="https://nodejs.org/en/docs/">Node.js</a> ,
                &nbsp;<a href="https://www.oracle.com/java/index.html">Java</a>,  
                 &nbsp;<a href="https://www.python.org/">Python</a> & <a href="https://www.djangoproject.com/">Django</a>, several different flavors of SQL, and am currently learning the JVM language <a href="https://www.scala-lang.org">Scala</a> as a hobby.
                <p></p>
                This site was originally set up as a sort of tagged, searchable journal to document different skills I have 
                been learning. I decided to try and consolidate some of them into organized blog posts. If you have any feedback I always appreciate it.
              </div>
            </div>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}
