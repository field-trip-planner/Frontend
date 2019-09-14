import React, { useState } from "react";
import api from "../../api";
import { Container, Button, Modal, Form, Icon } from "semantic-ui-react";

const CreateTripModal = props => {
  const [fieldTripInfo, setfieldTripInfo] = useState({
    name: "",
    date: "",
    address: "",
    supplies: "",
    cost: "",
    field_trip_details: ""
  });

  const _handleChange = e => {
    const { name, value } = e.target;
    console.log("input enter", value);
    setfieldTripInfo({
      ...fieldTripInfo,
      [name]: value
    });
  };

  const _handleSubmit = e => {
    e.preventDefault();
    api
      .post("fieldtrips", fieldTripInfo)
      .then(({ data }) => {
        setfieldTripInfo({
          name: "",
          date: "",
          address: "",
          supplies: "",
          cost: "",
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          creator_id: "59495f61-f31c-444d-a284-b2233e5aa914",
          field_trip_details: ""
        });
        props.onSubmitSuccess();
        return data;
      })
      .catch(err => err);
    console.log(fieldTripInfo);
  };

  return (
    <>
      <Modal
        trigger={
          <Button floated="right" primary>
            <Icon name="add" />
            Create Trip
          </Button>
        }
      >
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
                  placeholder="MM/DD/YYYY"
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
