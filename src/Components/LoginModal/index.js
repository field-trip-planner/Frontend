import React, { useState } from "react";
import { useGlobal } from "reactn";
import { withRouter } from "react-router-dom";
import api from "../../api";

import "./loginModal.css";

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

const LoginModal = props => {
  const [user, setUser] = useGlobal("user");
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
    api()
      .post("login", info)
      .then(res => {
        setUser(res.data.user);
        props.history.push("/dashboard");
      })
      .catch(err => err);
  };
  return (
    <>
      <Modal size="tiny" trigger={<span>Login</span>}>
        <Modal.Content>
          <Container className="login-container">
            <Grid textAlign="center" verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" textAlign="center">
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

                    <Button fluid size="large">
                      Login
                    </Button>

                    {/* <button
                      className="googleLoginButton"
                      color="teal"
                      size="large"
                    > */}
                    {/* Need to run backend on separate port locally to work. Need to update to use staging auth url once everything is pushed 
                    to staging */}
                    {/* <a href="http://localhost:5000/auth/google">
                        Log in with Google
                      </a>
                    </button> */}
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href="#!">Sign up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </Container>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default withRouter(LoginModal);
