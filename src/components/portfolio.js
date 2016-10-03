if (process.env.BROWSER) {
  require('../sass/portfolio.scss');
}

import React, { Component } from 'react';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { API_URL } from './application';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.headerStyle = {
      flex: '1 1 auto'
    }
  }
  render() {
    return (
      <div id="portfolio-container" >
        <div className="portfolio-item" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><h2>FormControl</h2></div>
                <div className="portfolio-code">
                  <a href="https://github.com/erik-sn/formcontrol/">
                    <img src="https://simpleicons.org/icons/github.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-img">
                  <Card><img src="../../src/img/formcontrol.png" /></Card>
                </div>
                <div className="portfolio-text">
                  <div className="portfolio-description">
                  Form Control is an application that lets users design, implement, share, and 
                  implement custom data entry applications. data input, storage, and analysis. 
                  </div>
                  <div className="portfolio-technology">React, Redux, TypeScript, Django</div>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><h2>repljs</h2></div>
                <div className="portfolio-code">
                  <a href="https://github.com/erik-sn/repljs/">
                    <img src="https://simpleicons.org/icons/github.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-text">
                  <div className="portfolio-description">
                  repljs is an in-browser JavaScript REPL (Read Eval Print Loop) application that supports
                  multiple JavaScript transpilers (Babel, CoffeeScript, TypeScript). It also incrementally
                  stores code as it is typed - which can be saved, downloaded and shared. This allows not just 
                  code to be stored, but the history of how it was written.
                  </div>
                  <div className="portfolio-technology">React, Redux, Django</div>
                </div>
                <div className="portfolio-img">
                  <Card><img src="../../src/img/repljs.png" /></Card>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item portfolio-item-split" >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
                title={"Markdown"}
              />
              <div className="portfolio-code">
                <a href="https://github.com/erik-sn/react-markdown/"><img src="https://simpleicons.org/icons/github.svg" /></a>
              </div>
              <div className="portfolio-description-container">
                Type in text and have it be converted to Github styles.  If logged in through
                Github you can save and retrieve markdowns to continue working on them. Built for FreeCodeCamp.
              </div>
              <div className="portfolio-technology">React, Django</div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item portfolio-item-split" >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
                title={"Simon"}
              />
              <div className="portfolio-code">
                <a href="https://github.com/erik-sn/react-simon/"><img src="https://simpleicons.org/icons/github.svg" /></a>
              </div>
              <div className="portfolio-description-container">
                Recreation of the 80's simon says game where the player must match the colors the game
                produces. Built for FreeCodeCamp.
              </div>
              <div className="portfolio-technology">React</div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item portfolio-item-split" >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
                title={"Pomodoro"}
              />
              <div className="portfolio-code">
                <a href="https://github.com/erik-sn/react-pomodoro/"><img src="https://simpleicons.org/icons/github.svg" /></a>
              </div>
              <div className="portfolio-description-container">
                A <a href="https://en.wikipedia.org/wiki/Time_management#Pomodoro">time management</a> application that cycles 
                between working and breaks. The clock timers and face can be adjusted. Built for FreeCodeCamp.
              </div>
              <div className="portfolio-technology">React</div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item portfolio-item-split" >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
                title={"React Calculator"}
              />
              <div className="portfolio-code">
                <a href="https://github.com/erik-sn/react-calculator/"><img src="https://simpleicons.org/icons/github.svg" /></a>
              </div>
              <div className="portfolio-description-container">
                A simple implementation of a calculator built in JavaScript using React.JS. 
                Use either your mouse or keyboard to run basic evaluations. Built for FreeCodeCamp.
              </div>
              <div className="portfolio-technology">React</div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item portfolio-item-split" >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
                title={"Wikipedia Viewer"}
              />
              <div className="portfolio-code">
                <a href="https://codepen.io/erik-sn/pen/OXmKvw">
                  <img src="https://simpleicons.org/icons/codepen.svg" />
                </a>
              </div>
              <div className="portfolio-description-container">
               Allows you to search for wikipedia pages or request a random page, displays some 
               initial information about the topic, and then keeps track of which pages you have looked. 
               Built for FreeCodeCamp.
              </div>
              <div className="portfolio-technology">jQuery</div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item portfolio-item-split" >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                className="portfolio-item-header"
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
                title={"Twitch Tracker"}
              />
              <div className="portfolio-code">
                <a href="https://codepen.io/erik-sn/pen/Pzjwrx">
                  <img src="https://simpleicons.org/icons/codepen.svg" />
                </a>
              </div>
              <div className="portfolio-description-container">
               Allows you to search for wikipedia pages or request a random page, displays some 
               initial information about the topic, and then keeps track of which pages you have looked. Built for FreeCodeCamp.
              </div>
              <div className="portfolio-technology">jQuery</div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item portfolio-item-split" >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
                title={"Local Weather"}
              />
              <div className="portfolio-code">
                <a href="https://codepen.io/erik-sn/pen/Pzjwrx">
                  <img src="https://simpleicons.org/icons/codepen.svg" />
                </a>
              </div>
              <div className="portfolio-description-container">
               Allows you to search for wikipedia pages or request a random page, displays some 
               initial information about the topic, and then keeps track of which pages you have looked. Built for FreeCodeCamp.
              </div>
              <div className="portfolio-technology">jQuery</div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item portfolio-item-split" >
          <MuiThemeProvider>
            <Card>
              <CardHeader
                style={this.headerStyle}
                titleStyle={this.titleStyle}
                subtitleStyle={this.subTitleStyle}
                title={"Random Quote Generator"}
              />
              <div className="portfolio-code">
                <a href="http://codepen.io/erik-sn/pen/oxPqWe">
                  <img src="https://simpleicons.org/icons/codepen.svg" />
                </a>
              </div>
              <div className="portfolio-description-container">
               Allows you to search for wikipedia pages or request a random page, displays some 
               initial information about the topic, and then keeps track of which pages you have looked. Built for FreeCodeCamp.
              </div>
              <div className="portfolio-technology">jQuery</div>
            </Card>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}