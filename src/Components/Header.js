import React from 'react';

import {
  Container,
  Menu,
  Button,
  Icon,
  Image,
  Divider,
  Embed,
  Grid,

} from 'semantic-ui-react';

function AppHeader() {
  return (
  <>
    <div>
      <Menu borderless>
          <Menu.Item header>MyFieldTripp</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item name='AboutUs'/>
            <Menu.Item name='How it works' />
            <Menu.Item name='login'/>
          </Menu.Menu>
      </Menu>
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
        <Grid.Column>
         <div className="landing-page-img-wrapper">
           <Image src='https://via.placeholder.com/200' />
           <p>Manage field trips using an all in one dashboard</p>
         </div>
        </Grid.Column>

        <Grid.Column>
          <div className="landing-page-img-wrapper">
            <Image src='https://via.placeholder.com/200' />
            <p>e-sign permission and integrated payment</p>
          </div>
        </Grid.Column>

        <Grid.Column>
          <div className="landing-page-img-wrapper">
            <Image src='https://via.placeholder.com/200' />
            <p>Real-time trips updates and notifications </p>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </Container>

  </>
  );
}

export default AppHeader;
