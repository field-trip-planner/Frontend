import React, { useState } from "react";
import { useGlobal } from "reactn";
import api from "../../api";
import { Container, Button, Modal, Form, Icon } from "semantic-ui-react";

const CreateTripModal = props => {
  const [user] = useGlobal("user");
  const [trips, setTrips] = useGlobal("trips");
  const [fieldTripInfo, setfieldTripInfo] = useState({
    name: "",
    date: "",
    address: "",
    supplies: "",
    cost: "",
    field_trip_details: "",
    school_id: user.school_id,
    creator_id: user.id,
    chaperoneTasks: ""
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
    api()
      .post("fieldtrips", fieldTripInfo)
      .then(({ data }) => {
        setfieldTripInfo({
          name: "",
          date: "",
          address: "",
          supplies: "",
          cost: "",
          school_id: "",
          field_trip_details: "",
          chaperoneTasks: ""
        });
        setTrips([...trips, data[0]]);
        props.setOpen(!props.open);
      })
      .catch(err => err);
    console.log(fieldTripInfo);
  };

  return (
    <>
      {user.role === "teacher" && (
        <Modal
          open={props.open}
          closeIcon
          onClose={() => props.setOpen(!props.open)}
          trigger={
            <Button
              floated="right"
              primary
              onClick={() => props.setOpen(!props.open)}
            >
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
                    type="date"
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
                    type="number"
                    name="cost"
                    value={fieldTripInfo.cost}
                    onChange={_handleChange}
                    width="5"
                  />
                </Form.Group>
                {/* adding 'fluid' in Form.TextArea causes error */}
                <Form.Group widths="equal">
                  <Form.TextArea
                    label="Field Trip Details"
                    name="field_trip_details"
                    value={fieldTripInfo.field_trip_details}
                    onChange={_handleChange}

                  />
                  <Form.TextArea
                    label="Chaperone Tasks"
                    name="chaperoneTasks"
                    value={fieldTripInfo.chaperoneTasks}
                    onChange={_handleChange}

                  />
                </Form.Group>
                <Form.Button primary>Submit</Form.Button>
              </Form>
            </Container>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

export default CreateTripModal;
