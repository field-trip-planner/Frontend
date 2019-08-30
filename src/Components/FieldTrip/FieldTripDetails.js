import React from "react";
// import { Link } from "react-router-dom";

import {
  Grid,
  Menu,
  Divider,
  Table,
  Button,
  Header,
  Icon,
  Container,
  Image,
  Segment,
  Modal
} from 'semantic-ui-react'

// import mock data
import { fieldTripList } from '../FieldTripList/index.js';
import './FieldTripDetails.css';

const FieldTripDetails = ({ match } ) => {

  const tripItemID = match.params.id;

  const fieldTrip = fieldTripList.find((trip) => {
    return trip.id === Number(tripItemID);
  })


  return (

    <>
      <Menu>
        <Menu.Item header>FieldTripp</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Menu>

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
                <h2>Additional Notes / Trip Summary: {fieldTrip.field_trip_details}</h2>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment basic clearing style={{ padding: "unset", marginTop: "120px" }} >
          <Button floated="right" primary style={{  }}>
            <Icon name="add user" />
            Add Student
          </Button>
        </Segment>


        <Table columns={5} style={{ marginTop: "20px" }}>
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
              <Table.Cell> <Icon name="check green"/> </Table.Cell>
              <Table.Cell> <Icon name="check green"/> </Table.Cell>
              <Table.Cell> <Icon name="minus"/> </Table.Cell>
              <Table.Cell> <Icon name="check green"/> </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> Jamie </Table.Cell>
              <Table.Cell> <Icon name="times red"/> </Table.Cell>
              <Table.Cell> <Icon name="question yellow"/> </Table.Cell>
              <Table.Cell> <Icon name="minus"/> </Table.Cell>
              <Table.Cell> <Icon name="question red"/> </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> Jill </Table.Cell>
              <Table.Cell> <Icon name="check green"/> </Table.Cell>
              <Table.Cell> <Icon name="check green"/> </Table.Cell>
              <Table.Cell> <Icon name="minus"/> </Table.Cell>
              <Table.Cell> <Icon name="check green"/> </Table.Cell>
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

      </Container>

    </>
  );
};

export default FieldTripDetails;
