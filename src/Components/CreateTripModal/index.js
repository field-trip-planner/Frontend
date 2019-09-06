import React, {useState} from "react";
import axios from 'axios';
import { Container, Button, Modal, Form, Icon } from "semantic-ui-react";

const CreateTripModal= () => {
  const [ fieldTripInfo, setfieldTripInfo ] = useState({
    //id:5,
    name: "",
    date: "",
    address: "",
    supplies: "",
    cost: "",
    field_trip_details: "",
  });

  const _handleChange = e => {
    const { name, value } = e.target;
    console.log('input enter',value)
    setfieldTripInfo({
      ...fieldTripInfo,
      [name]: value
    });
  };

  const _handleSubmit = e => {
    e.preventDefault();
      const url = `http://localhost:5000/fieldtrips`;
      const request = axios.post(url,fieldTripInfo);
      request
        .then(({ data }) => {
          setfieldTripInfo({
            name: "",
            date: "",
            address: "",
            supplies: "",
            cost: "",
            field_trip_details: "",
          })
          return data;
        })
        .catch(err => err);
    // if (info.password !== info.confirm_password) {
    //   throw new Error("Invalid Password"); // Not Ideal but we need to implement way to check
    // }
    console.log(fieldTripInfo);
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
                  value={fieldTripInfo.name}
                  onChange={_handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Date"
                  name="date"
                  value={fieldTripInfo.date}
                  onChange={_handleChange}
                />
                <Form.Input
                  fluid
                  label="Address"
                  name="address"
                  value={fieldTripInfo.address}
                  onChange={_handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Supplies"
                  name="supplies"
                  value={fieldTripInfo.supplies}
                  onChange={_handleChange}
                />
                <Form.Input
                  fluid
                  label="Cost"
                  name="cost"
                  value={fieldTripInfo.cost}
                  onChange={_handleChange}
                  width="7"
                />
              </Form.Group>
              {/* adding 'fluid' in Form.TextArea causes error */}
              <Form.TextArea
                label="Field Trip Details"
                name="field_trip_details"
                value={fieldTripInfo.field_trip_details}
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

export default CreateTripModal;