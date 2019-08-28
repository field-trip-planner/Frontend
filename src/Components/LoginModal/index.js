import React, { useState } from "react";
import "./loginModal.css";

import RegistrationModal from "../RegistrationModal/index";
import {
  Modal,
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from "semantic-ui-react";

export default () => {
  const [info, setInfo] = useState({
    email: "",
    password: ""
  });

  const _handleChange = e => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    });
  };
  const _handleSubmit = e => {
    e.preventDefault();
    console.log(info);
  };
  return (
    <>
      <Modal size="tiny" trigger={<span>Login</span>}>
        <Modal.Content>
          <Container className="login-container">
            <Grid textAlign="center" verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  Log-in to your account
                </Header>
                <Form onSubmit={_handleSubmit} size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="E-mail address"
                      name="email"
                      onChange={_handleChange}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={_handleChange}
                    />

                    <Button color="teal" fluid size="large">
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href="#!">Sign up</a>
                  {/* <RegistrationModal
                    element={<span className="login-signup">Sign Up</span>}
                  /> */}
                </Message>
              </Grid.Column>
            </Grid>
          </Container>
        </Modal.Content>
      </Modal>
    </>
  );
};
