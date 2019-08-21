import React from 'react';
import {
  Container,
  Menu,
  Button,
  Icon,
  Header,
} from 'semantic-ui-react'

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
    <Container text>
    <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      
    />
    <Header
      as='h2'
      content='Do whatever you want when you want to.'
      inverted
      
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
  </>
  );
}

export default AppHeader;