import React from 'react';
import museum from '../img/museum.jpg';

import {
  Container,
  Menu,
  Button,
  Icon,
  Header,
  Image,
  Divider,
  Embed,
  Grid,
  
} from 'semantic-ui-react';

function AppHeader() {
  return (
  <>
  <div className="nav">
    <Container>
      <div className="navbar">
        <div className="brand">
          <h2>MyFieldTripp.com</h2>
        </div>
        <div className="nav_menu">
          <h3>About Us</h3>
          <h3>How it works</h3>
          <h3>Log in</h3>
        </div>
      </div>
    </Container>
    {/* <Menu borderless color="blue">
        <Menu.Item header>MyFieldTripp</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name='AboutUs'/>
          <Menu.Item name='How it works' />
          <Menu.Item name='login'/>
        </Menu.Menu>
      </Menu> */}
    </div>
    <div className="hero">
      <Container>
        <p className="hero-text">TAKE CONTROL OF THE MADNESS BY USING SCHOOL
        FIELD TRIP PLANNER TO PLAN AND ORGANIZE YOUR NEXT FIELD TRIP</p>
        <Button primary size='huge'>
          Get Started
        <Icon name='right arrow' />
        </Button>
      </Container>
    </div> 
    <Container >
      <Embed id='125292332' placeholder='/images/vimeo-example.jpg' source='vimeo' aspectRatio='21:9'/>
    </Container>
    <Container>
      <Divider/>
    </Container>
    <Container>
    <Grid>   
      <Grid.Row columns={3}>
      <Grid.Column >
        <Image src='https://via.placeholder.com/150' />
        <p>Manage field trips using an all in one dashboard</p>
      </Grid.Column>
      <Grid.Column>
        <Image src='https://via.placeholder.com/150' />
        <p>e-sign permission and integrated payment</p>
      </Grid.Column>
      <Grid.Column>
        <Image src='https://via.placeholder.com/150' />
        <p>Real-time trips updates and notifications </p>
      </Grid.Column>
      </Grid.Row>
    </Grid>
    </Container>
  </>
  );
}

export default AppHeader;