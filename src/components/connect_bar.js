if (process.env.BROWSER) {
  require('../sass/admin.scss');
}

import React from 'react';

const ConnectBar = () => (
  <div id="connect-container" >
    <div className="connect-icon">
      <a href="https://github.com/erik-sn"><img src="https://simpleicons.org/icons/github.svg" /></a>
    </div>
    <div className="connect-icon">
      <a href="https://twitter.com/erik_init"><img src="https://simpleicons.org/icons/twitter.svg" /></a>
    </div>
    <div className="connect-icon">
      <a href="https://stackoverflow.com/users/4396787/erik-sn"><img src="https://simpleicons.org/icons/stackoverflow.svg" /></a>
    </div>
    <div className="connect-icon">
      <a href="https://codepen.io/erik-sn/"><img src="https://simpleicons.org/icons/codepen.svg" /></a>
    </div>
    <div className="connect-icon">
      <a href="https://www.freecodecamp.com/kiresuah"><img src="https://simpleicons.org/icons/freecodecamp.svg" /></a>
    </div>
  </div>
);
export default ConnectBar;

