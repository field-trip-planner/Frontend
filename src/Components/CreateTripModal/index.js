import React, { useState } from "react";
import { Container, Button, Modal, Form, Icon } from "semantic-ui-react";

export default () => {
  const [info, setInfo] = useState({
    name: "",
    date: "",
    address: "",
    supplies: "",
    cost: "",
    field_trip_details: "",

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

    // if (info.password !== info.confirm_password) {
    //   throw new Error("Invalid Password"); // Not Ideal but we need to implement way to check
    // }

    console.log(info);
  };
  return (
    <>
      <Modal trigger={
       <Button floated="right" primary>
        <Icon name="add" />
      Create Trip
    </Button>}>
        <Modal.Header className="modalHeader">Create Your Trip!</Modal.Header>
        <Modal.Content>
          <Container>
            <Form onSubmit={_handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Field Trip Name"
                  name="name"
                  value={info.name}
                  onChange={_handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Date"
                  name="date"
                  value={info.date}
                  onChange={_handleChange}
                />

                <Form.Input
                  fluid
                  label="Address"
                  type="text"
                  name="address"
                  value={info.address}
                  onChange={_handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Supplies"
                  type="text"
                  name="supplies"
                  value={info.supplies}
                  onChange={_handleChange}
                />
                <Form.Input
                  fluid
                  label="Cost"
                  type="text"
                  name="cost"
                  value={info.cost}
                  onChange={_handleChange}
                  width="7"
                />
              </Form.Group>
              {/* adding 'fluid' in Form.TextArea causes error */}
              <Form.TextArea
                label="Field Trip Details"
                name="field_trip_details"
                value={info.field_trip_details}
                onChange={_handleChange}
                width="7"
              />
              <Form.Button primary>Submit</Form.Button>
            </Form>
          </Container>
        </Modal.Content>
      </Modal>
    </>
  );
};
