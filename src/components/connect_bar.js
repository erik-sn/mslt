if (process.env.BROWSER) {
  require('../sass/admin.scss');
}

import React from 'react';

const ConnectBar = () => (
  <div id="connect-container" >
    <div className="connect-icon"><img src="https://simpleicons.org/icons/github.svg" /></div>
    <div className="connect-icon"><img src="https://simpleicons.org/icons/twitter.svg" /></div>
    <div className="connect-icon"><img src="https://simpleicons.org/icons/stackoverflow.svg" /></div>
    <div className="connect-icon"><img src="https://simpleicons.org/icons/codepen.svg" /></div>
    <div className="connect-icon"><img src="https://simpleicons.org/icons/freecodecamp.svg" /></div>
  </div>
);
export default ConnectBar;

