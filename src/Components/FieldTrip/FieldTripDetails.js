import React, { useState, useEffect } from "react"; // don't forget to add useEffect here!
// import { Link } from "react-router-dom";
import axios from 'axios';

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
  Message,
} from "semantic-ui-react";

import "./FieldTripDetails.css";
import MainMenu from "../layout/Menu.js";

import './FieldTripDetails.css';

const FieldTripDetails = ({ match } ) => {

  const [ trip, setTrip ] = useState({});  // local state
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const tripItemID = match.params.id;
    const url = `http://localhost:5000/fieldtrips/${tripItemID}`;

    const request = axios.get(url);
    request
      .then(({data}) => {
        console.log('trip item ', data);
        return setTrip(data);

      })
      .catch(err => err);
  }, [match.params.id] )  // explain why this works & tripItemID breaks it

  useEffect(() => {
    const url = `http://localhost:5000/students`;

    const request = axios.get(url);
    request
      .then(({data}) => {
        console.log('students ALL ', data);
        return setStudents(data);

      })
      .catch(err => err);
  }, [] )

  const [studentInfo, setStudentInfo] = useState({
    first_name: "",
    last_name: "",
  });

  // setting state
  const [isSuccessfullyAdded, setIsSuccessfullyAdded] = useState(false);
  const [error, setError] = useState({});

  const _handleChange = e => {
    const { name, value } = e.target;

    setError(false);

    setStudentInfo({
      ...studentInfo,
      [name]: value
    });

  };

  const _handleSubmit = e => {
    e.preventDefault();

    if (!studentInfo.first_name || !studentInfo.last_name) {
     return setError({
        message:  !studentInfo.first_name ? 'Please provide a first name': 'Please provide a last name'
      })
    }

    const url = `http://localhost:5000/students`;
    const request = axios.post(url, studentInfo);
    request
      .then(({data}) => {
        console.log('A student added:: ', data);

        setIsSuccessfullyAdded(true);
        setError(false);

        const request = axios.get(url);
        request
          .then(({data}) => {
            console.log('students ALL ', data);
            return setStudents(data);

          })
          .catch(err => err);

        setStudentInfo({
          first_name: "",
          last_name: "",
        })

        setTimeout(() => {
          setIsSuccessfullyAdded(false);

        }, 2000)

        return data;

      })
      .catch((err) => {
        // in case of err, here we make sure to set success to false
        setIsSuccessfullyAdded(false);
        // in order to add an error message in the modal we set hasError to true
        console.log("error", err.response.data)
        setError(err.response.data);

        return err;
      });
  };

  return (
    <>
      {/* trip is our local state data */}
      <MainMenu />
      <Container style={{ marginTop: "60px" }}>
        {trip.name && <Header>{trip.name.toUpperCase()}</Header>}

        <Divider style={{ marginBottom: "80px" }} />

        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column className="wrapper-border">
              <div className="trip-details-wrapper content-wrapper">
                <h2>Location: {trip.address}</h2>
                <h2>Date of Trip: {trip.date}</h2>
                <h2>Supplies: {trip.supplies}</h2>
                <h2>Cost: {trip.cost}</h2>
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
                  Additional Notes / Trip Summary: {" "}
                  {trip.field_trip_details}
                </h2>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment basic clearing style={{ padding: "unset", marginTop: 120}} >
          <Modal
            trigger={
              <Button floated="right" primary>
                <Icon name="add" />
                Add Student
              </Button>
            }
            closeIcon
            onClose={() => {
              setStudentInfo({
                first_name: "",
                last_name: "",
              });
              setIsSuccessfullyAdded(false);
              setError(false);
            }}
          >
            <Modal.Header className="modalHeader">Add Student</Modal.Header>
            <Modal.Content>
              {
                isSuccessfullyAdded && (
                  <Message positive>
                    <Message.Header>Student successfully added!</Message.Header>
                  </Message>
                )

              }

              {
                Object.keys(error).length > 0 && (
                  <Message negative>
                    <Message.Header>
                      We ran into an issue adding the student. {error.message}. And Please try again.
                    </Message.Header>
                  </Message>
                )

              }
              <Form onSubmit={_handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="First Name"
                    name="first_name"
                    value={studentInfo.first_name}
                    onChange={_handleChange}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Last Name"
                    name="last_name"
                    value={studentInfo.last_name}
                    onChange={_handleChange}
                  />
                </Form.Group>

                <Form.Button primary>Submit</Form.Button>
              </Form>
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

            { students.map((student) => {
              return (
                <Table.Row key={student.id}>
                  <Table.Cell>{student.first_name}</Table.Cell>
                  <Table.Cell> <Icon name="check" color="green"/> </Table.Cell>
                  <Table.Cell> <Icon name="check" color="green"/> </Table.Cell>
                  <Table.Cell> <Icon name="minus" color="red"/> </Table.Cell>
                  <Table.Cell> <Icon name="check" color="green"/> </Table.Cell>
                </Table.Row>
              )
            })}

          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>{students.length} Students Going</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>

        <Modal
          trigger={
            <Button floated="right" primary disabled>
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
                  value={trip.first_name}
                  onChange={_handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Last Name"
                  name="last_name"
                  value={trip.last_name}
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
