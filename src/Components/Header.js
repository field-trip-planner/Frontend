import React from 'react';
import {
  Container,
} from 'semantic-ui-react';

function AppHeader() {
  return (
  <>
  <div className="nav">
    <Container>
      <div className="navbar">
        <div className="brand">
          <h2>MyFieldTrip</h2>
        </div>
        <div className="nav_menu">
          <h3>About Us</h3>
          <h3>How it works</h3>
          <h3>Log in</h3>
        </div>
      </div>
    </Container>
    </div>
  </>
  );
}

export default AppHeader;