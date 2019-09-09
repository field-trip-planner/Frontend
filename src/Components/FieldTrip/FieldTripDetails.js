import React, { useState } from "react";
// import { Link } from "react-router-dom";

import {
  Grid,
  Divider,
  Table,
  Button,
  Header,
  Icon,
  Container,
  Image,
  Segment,
  Modal,
  Form,
  Info
} from "semantic-ui-react";

// import mock data
import { fieldTripList } from "../FieldTripList/index.js";
import "./FieldTripDetails.css";
import MainMenu from "../layout/Menu.js";

const FieldTripDetails = ({ match }) => {
  const tripItemID = match.params.id;

  const fieldTrip = fieldTripList.find(trip => {
    return trip.id === Number(tripItemID);
  });

  const [info, setInfo] = useState({
    first_name: "",
    last_name: ""
  });

  const _handleChange = e => {
    const { name, value } = e.target;

    setInfo({
      ...fieldTrip,
      [name]: value
    });
  };

  const _handleSubmit = e => {
    e.preventDefault();
    console.log(fieldTrip);
  };

  return (
    <>
      <MainMenu />
      <Container style={{ marginTop: "60px" }}>
        <Header>{fieldTrip.name.toUpperCase()}</Header>

        <Divider style={{ marginBottom: "80px" }} />

        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column className="wrapper-border">
              <div className="trip-details-wrapper content-wrapper">
                <h2>Location: {fieldTrip.address}</h2>
                <h2>Date of Trip: {fieldTrip.date}</h2>
                <h2>Supplies: {fieldTrip.supplies}</h2>
                <h2>Cost: {fieldTrip.cost}</h2>
              </div>
            </Grid.Column>

            <Grid.Column className="wrapper-border">
              <div className="trip-details-wrapper">
                <Image src="https://via.placeholder.com/400" />
                <p>GOOGLE MAP HERE</p>
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <div className="trip-summary-wrapper">
                <h2>
                  Additional Notes / Trip Summary:{" "}
                  {fieldTrip.field_trip_details}
                </h2>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment basic clearing style={{ padding: "unset", marginTop: 120 }}>
          <Modal
            trigger={
              <Button floated="right" primary>
                <Icon name="add" />
                Add Student
              </Button>
            }
            closeIcon
            inverted
          >
            <Modal.Header className="modalHeader">Add Student!</Modal.Header>
            <Modal.Content>
              {/*   <Container>  */}
              <Form onSubmit={_handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="First Name"
                    name="first_name"
                    value={fieldTrip.first_name}
                    onChange={_handleChange}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Last Name"
                    name="last_name"
                    value={fieldTrip.last_name}
                    onChange={_handleChange}
                  />
                </Form.Group>

                <Form.Button primary>Submit</Form.Button>
              </Form>
              {/*  </Container>  */}
            </Modal.Content>
          </Modal>
        </Segment>

        <Table columns={5} style={{ marginTop: 20, marginBottom: 50 }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Student Name</Table.HeaderCell>
              <Table.HeaderCell>Paid</Table.HeaderCell>
              <Table.HeaderCell>E-sign</Table.HeaderCell>
              <Table.HeaderCell>Supplies</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell> John </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="check green" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="check green" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="minus" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="check green" />{" "}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> Jamie </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="times red" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="question yellow" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="minus" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="question red" />{" "}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> Jill </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="check green" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="check green" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="minus" />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Icon name="check green" />{" "}
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>2 Students Going</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>

        <Modal
          trigger={
            <Button floated="right" primary>
              <Icon name="add" />
              Add Chaperone
            </Button>
          }
          closeIcon
        >
          <Modal.Header className="modalHeader">Add Chaperone!</Modal.Header>
          <Modal.Content>
            {/*   <Container>  */}
            <Form onSubmit={_handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="First Name"
                  name="first_name"
                  value={fieldTrip.first_name}
                  onChange={_handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Last Name"
                  name="last_name"
                  value={fieldTrip.last_name}
                  onChange={_handleChange}
                />
              </Form.Group>

              <Form.Button primary>Submit</Form.Button>
            </Form>
            {/*  </Container>  */}
          </Modal.Content>
        </Modal>
      </Container>
    </>
  );
};

export default FieldTripDetails;
