import React from 'react';

import {
  Container,
  Button,
  Icon,
  Header,
  Divider,
  Embed,
  Grid,
} from 'semantic-ui-react';

function AppMain() {
  return (
  <>
    <div className="hero">
      <Container>
        <p className="hero-text">TAKE CONTROL OF THE MADNESS BY USING SCHOOL
        FIELD TRIP PLANNER TO PLAN AND ORGANIZE YOUR NEXT FIELD TRIP</p>
        <Button primary size='huge'inverted color='white'>
          Get Started
        <Icon name='right arrow' />
        </Button>
      </Container>
    </div> 
    <Container>
        <Header as='h4' color='violet' size='huge' textAlign="center">
          features
        </Header>
    </Container>
    <Container>
    <Grid className="features">   
      <Grid.Row columns={3}>
      <Grid.Column className ="col">
        <Icon name='laptop' size='massive' color="violet" />
        <p>Manage field trips using an all in one dashboard</p>
      </Grid.Column>
      <Grid.Column className ="col">
        <Icon name='payment' size='massive' color="violet"/>
        <p>E-sign permission and integrated payment</p>
      </Grid.Column>
      <Grid.Column className ="col">
      <Icon name='road' size='massive' color="violet"/>
        <p>Real-time trips updates and notifications </p>
      </Grid.Column>
      </Grid.Row>
    </Grid>
    </Container>
    <Container>
        <Divider></Divider>
        <Header as='h4' color='violet' size='huge' textAlign="center">
          How it Works
        </Header>
    </Container>
    <Container >
      <div className="explainer">
        <Embed id='125292332' placeholder='/images/vimeo-example.jpg' source='vimeo' aspectRatio='16:9'/>
      </div>
    </Container> 
  </>
  );
}

export default AppMain;