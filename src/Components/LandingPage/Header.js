import React from 'react';
import RegistrationModal from '../RegistrationModal';
import './landingPage.css';

import {
  Container,
  Menu,
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
          <Menu.Menu className = "siblingFade" position="right">
            <Menu.Item as="span" className="menuItem" name='AboutUs'/>
            <Menu.Item as="span" className="menuItem" name='How it works' />
            <Menu.Item as="span" className="menuItem" name='login'/>
          </Menu.Menu>
      </Menu>
    </div>

      <div className="hero">
        <div className="overlay"></div>
          <div className="hero-text-wrapper">
          <p className="hero-text">
              TAKE CONTROL OF THE MADNESS BY USING OUR
              APP TO PLAN AND ORGANIZE YOUR NEXT FIELD TRIP
            </p>
            <RegistrationModal/>
          </div>
      </div>


    <Container style={{ marginTop: '70px', marginBottom: '70px' }}>
      <Embed id='125292332' placeholder='/images/vimeo-example.jpg' source='vimeo' aspectRatio='21:9'/>
    </Container>

    <Container style={{ marginTop: '70px', marginBottom: '70px' }}>
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
