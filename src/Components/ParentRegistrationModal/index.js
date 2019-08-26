import React, { useState } from "react";
import { Container, Button, Modal, Form } from "semantic-ui-react";

export default () => {
  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: ""
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
    if (info.password !== info.confirm_password) {
      throw new Error("Invalid Password"); // Not Ideal but we need to implement way to check
    }
    console.log(info);
  };
  return (
    <>
      <Modal trigger={<Button>Sign Up</Button>}>
        <Modal.Header>Parent Registration</Modal.Header>
        <Modal.Content>
          <Container>
            <Form onSubmit={_handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="First Name"
                  placeholder="First Name"
                  name="first_name"
                  value={info.first_name}
                  onChange={_handleChange}
                />
                <Form.Input
                  fluid
                  label="Last Name"
                  placeholder="Last Name"
                  name="last_name"
                  value={info.last_name}
                  onChange={_handleChange}
                />
              </Form.Group>
              <Form.Input
                fluid
                label="Username"
                placeholder="Username"
                name="username"
                value={info.username}
                onChange={_handleChange}
              />
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                name="email"
                value={info.email}
                onChange={_handleChange}
              />
              <Form.Input
                fluid
                label="Password"
                placeholder="Password"
                type="password"
                name="password"
                value={info.password}
                onChange={_handleChange}
              />
              <Form.Input
                fluid
                label="Confirm Password"
                placeholder="Password"
                type="password"
                name="confirm_password"
                value={info.confirm_password}
                onChange={_handleChange}
              />
              <Form.Input
                fluid
                label="Phone"
                placeholder="555-222-3423"
                name="phone"
                value={info.phone}
                onChange={_handleChange}
              />
              <Form.Button>Submit</Form.Button>
            </Form>
          </Container>
        </Modal.Content>
      </Modal>
    </>
  );
};
