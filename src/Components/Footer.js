import React from 'react';

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
  Segment,
  List,
  
} from 'semantic-ui-react';

function Footer() {
  return (
    <>
    <div>
    <Segment inverted color='black'vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Divider inverted section />
        <Image centered size='mini' src='https://via.placeholder.com/25' />
        <List horizontal inverted color="white" divided link size='small'>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
    </div>
    </>
  );
}

// avail sizes >> ["mini","tiny","small","large","fullscreen"]
export default Footer;