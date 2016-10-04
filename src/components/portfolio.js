if (process.env.BROWSER) {
  require('../sass/portfolio.scss');
}

import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.headerStyle = {
      flex: '1 1 auto',
    };
  }
  render() {
    return (
      <div id="portfolio-container" >
        <div className="portfolio-item" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://devreduce.com/formcontrol/"><h2>FormControl</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://github.com/erik-sn/formcontrol/">
                    <img src="https://simpleicons.org/icons/github.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-img">
                  <Card><img src="/resources/img/formcontrol.png" /></Card>
                </div>
                <div className="portfolio-text">
                  <div className="portfolio-description">
                  Form Control is an application that lets users design, implement, share, and 
                  implement custom data entry applications. data input, storage, and analysis. 
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    React, Redux, TypeScript, Django
                  </div>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item img-right" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://devreduce.com/repljs/"><h2>repljs</h2></a></div>
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
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    React, Redux, Django
                  </div>
                </div>
                <div className="portfolio-img">
                  <Card><img src="/resources/img/repljs.png" /></Card>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://devreduce.com/markdown/"><h2>Markdown</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://github.com/erik-sn/react-markdown/">
                    <img src="https://simpleicons.org/icons/github.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-img">
                  <Card><img src="/resources/img/markdown.png" /></Card>
                </div>
                <div className="portfolio-text">
                  <div className="portfolio-description">
                Type in text and have it be converted to Github styles.  If logged in through
                Github you can save and retrieve markdowns to continue working on them. Built for FreeCodeCamp.
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    React, Django
                  </div>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item img-right" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://devreduce.com/simon/"><h2>Simon</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://github.com/erik-sn/react-simon/">
                    <img src="https://simpleicons.org/icons/github.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-text">
                  <div className="portfolio-description">
                Recreation of the 80's simon says game where the player must match the colors the game
                produces. Built for FreeCodeCamp.
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    React
                  </div>
                </div>
                <div className="portfolio-img">
                  <Card><img src="/resources/img/simon.png" /></Card>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://devreduce.com/tictactoe/"><h2>Tic-Tac-Toe</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://github.com/erik-sn/react-tictactoe/">
                    <img src="https://simpleicons.org/icons/github.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-img">
                  <Card><img src="/resources/img/tictactoe.png" /></Card>
                </div>
                <div className="portfolio-text">
                  <div className="portfolio-description">
                  Classic Tic-Tac-Toe game. It features an "unbeatable" AI which will draw or win every match, implemented using 
                  the <a href="https://en.wikipedia.org/wiki/Minimax">minimax  algorithm</a>.
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    React
                  </div>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item img-right" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://devreduce.com/pomodoro/"><h2>Pomodoro</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://github.com/erik-sn/react-pomodoro/">
                    <img src="https://simpleicons.org/icons/github.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-text">
                  <div className="portfolio-description">
                    A <a href="https://en.wikipedia.org/wiki/Time_management#Pomodoro">time management</a> application that cycles 
                    between working and breaks. The clock timers and face can be adjusted. Built for FreeCodeCamp.
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    React
                  </div>
                </div>
                <div className="portfolio-img">
                  <Card><img src="/resources/img/pomodoro.png" /></Card>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://devreduce.com/calculator/"><h2>React Calc</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://github.com/erik-sn/react-calc/">
                    <img src="https://simpleicons.org/icons/github.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-img">
                  <Card><img src="/resources/img/calc.png" /></Card>
                </div>
                <div className="portfolio-text">
                  <div className="portfolio-description">A simple implementation of a calculator
                   built in JavaScript using React.JS. Use either your mouse or keyboard to run basic evaluations.
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    React
                  </div>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item img-right" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://codepen.io/erik-sn/full/QNZbJB"><h2>Local Weather</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://codepen.io/erik-sn/pen/QNZbJB">
                    <img src="https://simpleicons.org/icons/codepen.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-text">
                  <div className="portfolio-description">
               Retrieves your current local weather and hourly forecast and displays it on an environment.
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    jQuery
                  </div>
                </div>
                <div className="portfolio-img">
                  <Card><img src="/resources/img/weather.png" /></Card>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="https://codepen.io/erik-sn/full/OXmKvw"><h2>Wikipedia Viewer</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://codepen.io/erik-sn/pen/OXmKvw">
                    <img src="https://simpleicons.org/icons/codepen.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-text">
                  <div className="portfolio-description">
               Allows you to search for wikipedia pages or request a random page, displays some 
               initial information about the topic, and then keeps track of which pages you have looked. 
               Built for FreeCodeCamp.
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    jQuery
                  </div>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
        <div className="portfolio-item" >
          <MuiThemeProvider>
            <Card>
              <div className="portfolio-header">
                <div className="portfolio-header-name"><a href="http://codepen.io/erik-sn/full/oxPqWe"><h2>Random Quote Generator</h2></a></div>
                <div className="portfolio-code">
                  <a href="https://codepen.io/erik-sn/pen/oxPqWe">
                    <img src="https://simpleicons.org/icons/codepen.svg" />
                  </a>
                </div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-text">
                  <div className="portfolio-description">
               Retrieves random quotes from designers and searches google for their picture, then displays both
                  </div>
                  <div className="portfolio-technology">
                    <h4>Technologies Used:</h4>
                    jQuery
                  </div>
                </div>
              </div>
            </Card>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}