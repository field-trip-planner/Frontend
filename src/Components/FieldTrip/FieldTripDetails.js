import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import {useGlobal} from "reactn";
// import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  List,
  Message,
  Modal,
  Segment,
  Table,
} from "semantic-ui-react";
import api from "../../api";
import MainMenu from "../layout/Menu.js";
import "./FieldTripDetails.css";

const options = {
  shouldSort: true,
  threshold: 0.5,
  location:4,
  distance: 10,
  maxPatternLength: 12,
  minMatchCharLength: 1,
  keys: [
    "last_name",
    "first_name"
  ]
};


const FieldTripDetails = ({ match } ) => {

  const [ trip, setTrip ] = useState({});  // local state
  const [students, setStudents] = useState([]);
  const [chaperones, setChaperones] = useState([]);
  const [user] = useGlobal("user");
  //const [searchChaperone, updateSearchChaperone] = useState("");
  //const [foundChap, updateFoundChap] = useState({});

  useEffect(() => {
    const tripItemID = match.params.id;
    const url = `fieldtrips/${tripItemID}`;

    
    api
    .get(url)
      .then(({data}) => {
        console.log('trip item ', data);
        
        return setTrip(data);
      })
      .catch(err => err);
      
     
    api
      .get(`users/chaperones/${user.school_id}`)  
      .then(({data}) => {
        console.log('>>> chaperones ', data);

        return setChaperones(data);
      })
      .catch(err => err);
    
    api
      .get(`students_fieldtrips/${tripItemID}/statuses`)
      .then(({ data }) => {
        console.log("ALL STATUS:", data);

        return setStudents(data);
      })
      .catch(err => err);
    }, [match.params.id])

    ///////////////////////////////
    const fuse = new Fuse(chaperones, options);  
    const [searchVal, searchChaperones] = useState('');
    const chaperonesFound = searchVal ? fuse.search(searchVal) : chaperones;

    const _handleSearch = e => {
        const{name, value} = e.target;
        searchChaperones(value);

    };
    
    ////////////////////// 
    const ChaperoneCard = ({chaperone}) => {
      const {id, first_name, last_name, phone_number, email, role, school_id} = chaperone;
      return (
          <Card.Content>
          <Icon.Group size='large'>
            <Icon loading size='large' name='circle notch' />
            <Icon name='user' />
          </Icon.Group>
            <Button key = {chaperone.id} color = 'blue' onClick = {_handleAddChap}>
              {chaperone.last_name}  {chaperone.first_name}                               
            </Button>                             
          </Card.Content>
      )
  } 

  const _handleAddChap = e => {

  }

  // setting state for the student information to be entered by user
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

    const url = "students";

    const newStudentPayload = {
      ...studentInfo,
      field_trip_id: match.params.id
    }

    api
      .post(url, newStudentPayload)
      .then(({data}) => {
        console.log('A student added::', data);

        setIsSuccessfullyAdded(true);
        setError(false);

        const tripItemID = match.params.id;
        const statusUrl = `students_fieldtrips/${tripItemID}/statuses`;

        api
          .get(statusUrl)
          .then(({data}) => {
            console.log('students ALL::', data);
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

  const onHandleCheckbox = async (studentStatus) => {

    const clickedStudentStatusID = studentStatus.studentStatusID;
    const url = `students_fieldtrips/${clickedStudentStatusID}`;

    const {
      paid_status,
      permission_status,
      supplies_status,
    } = studentStatus

    api
      .put(url, {
        paid_status,
        permission_status,
        supplies_status,
      })
      .then(({ data }) => {

        console.log("STUDENT_STATUS_DATA::", data);

        return data;

      })
      .catch((err) => {
        console.log(err)
      });

    const updatedStudents = students.map((student) => {
      if (student.id === clickedStudentStatusID) {
        return {
          ...student,
          ...studentStatus,
        }
      }
      return student;
    })
    console.log("updatedStudents:", updatedStudents);

    setStudents(updatedStudents);
  }

  const getStatus = (studentID) => {
    const selectedStudent = students.find((student) => {
      return student.id === studentID;
    })

    if (selectedStudent.paid_status &&
      selectedStudent.permission_status &&
      selectedStudent.supplies_status) {

      return 'complete';
    }
    return 'incomplete'
  }

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
          <Header as='h2' floated='left'>Attending Students</Header>
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
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Paid</Table.HeaderCell>
              <Table.HeaderCell>E-sign</Table.HeaderCell>
              <Table.HeaderCell>Supplies</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              students.map((student) => {
                return (
                  <Table.Row key={student.id}>
                    <Table.Cell>{student.first_name}</Table.Cell>
                    <Table.Cell>{student.last_name}</Table.Cell>
                    <Table.Cell>
                        <Checkbox checked={student.paid_status}
                          onClick={(e, data) => onHandleCheckbox({
                            studentStatusID: student.id,
                            paid_status: data.checked,
                          })}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Checkbox checked={student.permission_status}
                          onClick={(e, data) => onHandleCheckbox({
                            studentStatusID: student.id,
                            permission_status: data.checked,
                          })}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Checkbox checked={student.supplies_status}
                          onClick={(e, data) => onHandleCheckbox({
                            studentStatusID: student.id,
                            supplies_status: data.checked,
                          })}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        {getStatus(student.id)}
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>{students.length} Students Going</Table.HeaderCell>
              <Table.HeaderCell />
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


          
          <Card.Group itemsPerRow = {2} textAlign = 'right'>
            <Card>
              <Input
                onChange={_handleSearch}
                size="large"
                icon="search"
                iconPosition="left"
                placeholder="...search"
                floated="left"
                value={searchVal}
              />
            </Card> 

            { chaperonesFound
              ? 
                  <Card centered >
                  {chaperonesFound.map(chap => (                
                      <ChaperoneCard key = {chap.id}  chaperone = {chap}/>                                                                               
                  ))}
                  </Card>
              :
                  null 
          } 
          </Card.Group>

        </Modal>
      </Container>
    </>
  );
};

export default FieldTripDetails;
