import React, { useState, useEffect } from "react";
import {useGlobal} from "reactn";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Message,
  Modal,
  Segment
} from "semantic-ui-react";

import api from "../../api";
import MainMenu from "../layout/Menu.js";
import TeacherFieldTripDetailView from "./TeacherFieldTripDetailView";
import ChaperoneFieldTripDetailView from "./ChaperoneFieldTripDetailView";
import StudentsReadOnlyTable from "./StudentsReadOnlyTable";
import ChaperonesTable from "./ChaperonesTable";
import "./FieldTripDetails.css";

const FieldTripDetails = ({ match }) => {

  const [trip, setTrip] = useState({}); // local state
  const [students, setStudents] = useState([]);
  const [chaperones, setChaperones] = useState([]);
  const [user] = useGlobal("user");
  const [chaperonesToAssign, setChaperonesToAssign] = useState([]);

  const tripItemID = match.params.id;

  useEffect(() => {
    const url = `fieldtrips/${tripItemID}`;

    api
      .get(url)
      .then(({ data }) => {
        console.log('trip item ', data);

        return setTrip(data);
      })
      .catch(err => err);

    api
      .get(`students_fieldtrips/${tripItemID}/statuses`)
      .then(({ data }) => {
        console.log("ALL STATUS:", data);

        return setStudents(data);
      })
      .catch(err => err);

    api
      .get(`/chaperones/${tripItemID}`)
      .then(res => setChaperones(res.data))
      .catch(err => console.log(err));

  }, [tripItemID, user.school_id]);

  // Fuzzy search
  const fuse = new Fuse(chaperonesToAssign, options);
  const [searchVal, searchChaperones] = useState('');
  let chaperonesFound = searchVal ? fuse.search(searchVal) : chaperonesToAssign;

  const _handleSearch = e => {
      const{name, value} = e.target;
      searchChaperones(value);
      console.log('>>>>> chaperonesFound ', chaperonesFound);
      console.log('====>> NOW assignedChap', chaperonesToAssign);
  };

  const ChaperoneCard = ({ chaperone }) => {
    const {id, first_name, last_name, phone_number, email, role, school_id} = chaperone;
    return (
        <Card.Content>
        <Icon.Group size='large'>
          <Icon loading size='large' name='circle notch' />
          <Icon name='user' />
        </Icon.Group>
          <Button key={chaperone.id} id={chaperone.id} color='blue' onClick={_handleAddChap}>
            {chaperone.last_name}  {chaperone.first_name}
          </Button>
        </Card.Content>
    )
  }

  const _handleAddChap = (e, { id })  => {
    console.log("e Target::", e.target)
    console.log("data Target::", id)

    let addedChaperone = {
      user_id: id,
      field_trip_id: trip.id
    }

    api
    .post (`chaperones/`, addedChaperone )
    .then(({data}) => {
      api
        .get(`/chaperones/${tripItemID}`)
        .then(res => setChaperones(res.data))
        .catch(err => console.log(err));

      const newChaperoneList = chaperonesToAssign.filter(chaperone => chaperone.id !== id);
      return setChaperonesToAssign(newChaperoneList);
    })
    .catch(err => err);

    setIsSuccessfullyAdded(true);
    setError(false);
  };

  // setting state for the student information to be entered by user
  const [studentInfo, setStudentInfo] = useState({
    first_name: "",
    last_name: ""
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
        message: !studentInfo.first_name
          ? "Please provide a first name"
          : "Please provide a last name"
      });

    }

    const url = "students";

    const newStudentPayload = {
      ...studentInfo,
      field_trip_id: match.params.id,
      school_id: trip.school_id
    }

    api
      .post(url, newStudentPayload)
      .then(({ data }) => {
        console.log('A student added::', data);

        setIsSuccessfullyAdded(true);
        setError(false);

        const tripItemID = match.params.id;
        const statusUrl = `students_fieldtrips/${tripItemID}/statuses`;

        api
          .get(statusUrl)
          .then(({ data }) => {
            console.log("students ALL::", data);
            return setStudents(data);
          })
          .catch(err => err);

        setStudentInfo({
          first_name: "",
          last_name: ""
        });

        setTimeout(() => {
          setIsSuccessfullyAdded(false);
        }, 2000);

        return data;
      })
      .catch(err => {
        // in case of err, here we make sure to set success to false
        setIsSuccessfullyAdded(false);
        // in order to add an error message in the modal we set hasError to true
        console.log("error", err.response.data);
        setError(err.response.data);

        return err;
      });
  };

  const onHandleCheckbox = async studentStatus => {
    const clickedStudentStatusID = studentStatus.studentStatusID;
    const url = `students_fieldtrips/${clickedStudentStatusID}`;

    const {
      paid_status,
      permission_status,
      supplies_status,
    } = studentStatus;

    api
      .put(url, {
        paid_status,
        permission_status,
        supplies_status
      })
      .then(({ data }) => {
        console.log("STUDENT_STATUS_DATA::", data);

        return data;
      })
      .catch(err => {
        console.log(err);
      });

    const updatedStudents = students.map(student => {
      if (student.id === clickedStudentStatusID) {
        return {
          ...student,
          ...studentStatus
        };
      }
      return student;
    });
    console.log("updatedStudents:", updatedStudents);

    setStudents(updatedStudents);
  };

  const getStatus = studentID => {
    const selectedStudent = students.find(student => {
      return student.id === studentID;
    });

    if (
      selectedStudent.paid_status &&
      selectedStudent.permission_status &&
      selectedStudent.supplies_status
    ) {
      return "complete";
    }
    return "incomplete";
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
          {user.role === "teacher" || user.role === "chaperone" ?
            <ChaperoneFieldTripDetailView trip={trip} /> :
            null
          }
        </Grid>

        <StudentsReadOnlyTable
          students={students}
          getStatus={getStatus}
        />

        <TeacherFieldTripDetailView
          setError={setError}
          error={error}
          setStudentInfo={setStudentInfo}
          studentInfo={studentInfo}
          trip={trip}
          students={students}
          getStatus={getStatus}
          setIsSuccessfullyAdded={setIsSuccessfullyAdded}
          isSuccessfullyAdded={isSuccessfullyAdded}
          _handleSubmit={_handleSubmit}
          _handleChange={_handleChange}
          chaperones={chaperones}
          onHandleCheckbox={onHandleCheckbox}
        />
        <ChaperonesTable chaperones={chaperones} />
      </Container>
    </>
  );
};

export default FieldTripDetails;
