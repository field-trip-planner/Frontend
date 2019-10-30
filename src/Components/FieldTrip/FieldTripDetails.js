import React, { useState, useEffect } from "react";
import { useGlobal } from "reactn";
import { Container, Divider, Grid, Header, Icon, Segment } from "semantic-ui-react";

import api from "../../api";
import formatDate from "../../Utils/formatDate"
import MainMenu from "../layout/Menu.js";
import TeacherFieldTripDetailView from "./TeacherFieldTripDetailView";
import ChaperoneFieldTripDetailView from "./ChaperoneFieldTripDetailView";
import StudentsReadOnlyTable from "./StudentsReadOnlyTable";
import ChaperonesTable from "./ChaperonesTable";
import TripGMap from './TripGMap';
import "./FieldTripDetails.css";

let perPage;
const FieldTripDetails = ({ match }) => {
  const [trip, setTrip] = useState({}); // local state
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [statusIncompleteCount, setStatusIncompleteCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [lastAddedStudentStatusID, setLastAddedStudentStatusID] = useState(
    null
  );
  const [chaperones, setChaperones] = useState([]);
  const [user] = useGlobal("user");
  const [parentList, setParentList] = useState([]);
  const tripItemID = match.params.id;
  const [sortBy, setSortBy] = useState("last_name");
  const [direction, setDirection] = useState("ascending");
  const [activePage, setActivePage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const url = `fieldtrips/${tripItemID}`;
    api()
      .get(url)
      .then(({ data }) => {
        console.log("trip item ", data);

        return setTrip(data);
      })
      .catch(err => err);

    api()
      .get(`students_fieldtrips/${tripItemID}/statuses`)
      .then(({ data }) => {
        console.log("ALL STATUS:", data);
        const {
          completeStudentStatusesSorted,
          statusIncompleteCount,
          totalCount,
          totalPages
        } = data;
        setStudents(completeStudentStatusesSorted);
        setTotalCount(totalCount);
        setStatusIncompleteCount(statusIncompleteCount);
        setTotalPages(totalPages);
        perPage = data.perPage;
      })
      .catch(err => err);

    api()
      .get(`/chaperones/${tripItemID}`)
      .then(res => setChaperones(res.data))
      .catch(err => console.log(err));

    api()
      .get(`users/parents/${user.school_id}`)
      .then(({ data }) => {
        // console.log("this is parent found by id",data)
        // console.log("this is the current user", user)
        setParentList(data);
      })
      .catch(err => err);
  }, [tripItemID, user.school_id]);

  // setting state for the student information to be entered by user
  const [studentInfo, setStudentInfo] = useState({
    first_name: "",
    last_name: "",
    parent_id: ""
  });

  // setting state
  const [isSuccessfullyAdded, setIsSuccessfullyAdded] = useState(false);
  const [error, setError] = useState({});

  const _handleChange = e => {
    const { name, value } = e.target;
    setError(false);

    setStudentInfo({
      ...studentInfo,
      [name]: value,
      parent_id: value
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
      school_id: user.school_id
    };

    api()
      .post(url, newStudentPayload)
      .then(({ data }) => {
        console.log("A student added::", data);

        setIsSuccessfullyAdded(true);
        setError(false);

        if (students.length < perPage) {
          const updatedStudents = [data, ...students];
          setStudents(updatedStudents);
        } else {
          // Slice when the perPage is 5 students on the student status table
          const studentsMinusLastOne = students.slice(0, students.length - 1);
          const updatedStudents = [data, ...studentsMinusLastOne];
          setStudents(updatedStudents);
        }
        setTotalCount(totalCount + 1);

        const updatedTotalPages = Math.ceil((totalCount + 1) / perPage);
        setTotalPages(updatedTotalPages);

        setLastAddedStudentStatusID(data.id);
        setStatusIncompleteCount(statusIncompleteCount + 1);

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

  const onHandleCheckbox = studentStatus => {
    const clickedStudentStatusID = studentStatus.studentStatusID;
    const url = `students_fieldtrips/${clickedStudentStatusID}`;

    const { paid_status, permission_status, supplies_status } = studentStatus;

    api()
      .put(url, {
        paid_status,
        permission_status,
        supplies_status
      })
      .then(({ data }) => {
        console.log("STUDENT_STATUS_DATA::", data);
        api()
          .get(`students_fieldtrips/${tripItemID}/statuses`)
          .then(({ data }) => {
            console.log("ALL STATUS:", data);
            const {
              statusIncompleteCount,
            } = data;
            setStatusIncompleteCount(statusIncompleteCount);
          })
          .catch(err => err);
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

  const onPaginationChange = activePage => {
    const shortDirection = shortenDirection(direction);
    const statusUrl = `students_fieldtrips/${tripItemID}/statuses?page=${activePage}&sortBy=${sortBy}&direction=${shortDirection}&query=${query}`;

    api()
      .get(statusUrl)
      .then(({ data }) => {
        setStudents(data.completeStudentStatusesSorted);
        setLastAddedStudentStatusID(null);
        return setTotalCount(data.totalCount);
      })
      .catch(err => err);
  };

  const onDeleteMessageConfirmation = (studentFieldTripId, currentPage) => {
    const url = `students_fieldtrips/${studentFieldTripId}`;
    const currentPageStatusUrl = `students_fieldtrips/${tripItemID}/statuses?page=${currentPage}`;

    api()
      .delete(url)
      .then(({ data }) => {
        console.log("DELETED STUDENT::", data);
        // Get deleted student's name here
        api()
          .get(currentPageStatusUrl)
          .then(({ data }) => {
            console.log("ALL STUDENTS AFTER A DELETE::", data);
            setStudents(data.completeStudentStatusesSorted);
            setTotalCount(data.totalCount);
            return setTotalPages(data.totalPages);
          })
          .catch(err => err);
      })
      .catch(err => err);
  };

  const getDirection = (clickedColumn) => {
    if (sortBy !== clickedColumn) {
      return 'ascending';
    }
    return direction === 'ascending' ?
      'descending' : 'ascending';
  };

  function shortenDirection (newDirection) {
    return newDirection === "ascending" ? "asc" : "desc";
  }

  const handleSort = (clickedColumn, activePage) => () => {
    if (sortBy !== clickedColumn) {
      setSortBy(clickedColumn);
    }
    const newDirection = getDirection(clickedColumn);
    setDirection(newDirection);
    const shortDirection = shortenDirection(newDirection);

    const statusUrl = `students_fieldtrips/${tripItemID}/statuses?page=${activePage}&sortBy=${clickedColumn}&direction=${shortDirection}&query=${query}`;

    api()
      .get(statusUrl)
      .then(({ data }) => {
        setStudents(data.completeStudentStatusesSorted);
        setLastAddedStudentStatusID(null);
        return setTotalCount(data.totalCount);
      })
      .catch(err => err);
  }

  const onKeyDownSearchChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    if (!value) {
      api()
        .get(`students_fieldtrips/${tripItemID}/statuses`)
        .then(({ data }) => {
          console.log("ALL STATUS:", data);
          setStudents(data.completeStudentStatusesSorted);
          setTotalCount(data.totalCount);
          setTotalPages(data.totalPages);

          // resetting state to default
          setSortBy("last_name");
          direction("ascending");
          setActivePage(1);
        })
        .catch(err => err);
      return;
    }

    const searchUrl = `students_fieldtrips/${tripItemID}/statuses/search?query=${value}`;
    api()
      .get(searchUrl)
      .then(({ data }) => {
        const {
          searchedStudentStatus,
          totalPagesOnSearchResult,
          countOnSearchResult
        } = data;
        console.log("SEARCH_DATA::", data)
        setStudents(searchedStudentStatus);
        setLastAddedStudentStatusID(null);
        setTotalPages(totalPagesOnSearchResult);
        return setTotalCount(countOnSearchResult);
      })
      .catch(err => err);
  }

  const onSearchClear = () => {
    setQuery("");
    api()
      .get(`students_fieldtrips/${tripItemID}/statuses`)
      .then(({ data }) => {
        const {completeStudentStatusesSorted, totalCount, totalPages} = data;
        setStudents(completeStudentStatusesSorted);
        setTotalCount(totalCount);
        setTotalPages(totalPages);

        // resetting state to default
        setSortBy("last_name");
        direction("ascending");
        setActivePage(1);
      })
      .catch(err => err);
  }

  const onMapMount = (markerOptions, {formatted_address, tripName}) => {
    const marker = new window.google.maps.Marker(markerOptions);

    const infowindowHTML = '<div class="infowindow">' + tripName + '</div>' + '<div><a href="https://www.google.com/maps/place/'+ formatted_address + '"  target="_blank">View on Google Maps</a></div>';

    const infowindow = new window.google.maps.InfoWindow();
    infowindow.setContent(infowindowHTML);

    marker.addListener('mouseover', () => {
      infowindow.open(markerOptions.map, marker);
    })
  }

  return (
    <>
      {/* trip is our local state data */}
      <MainMenu />
      <Container style={{ marginTop: "60px" }}>
        {trip.name && <Header>{trip.name.toUpperCase()}</Header>}

        <Divider style={{ marginBottom: "80px" }} />
        <Segment raised>
          <Grid>
            <Grid.Row columns={2}
                      style={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: 4,
                        padding: 'unset'
                      }}
            >
              <Grid.Column className="wrapper-details">
                <div className="trip-details-wrapper">
                  <div className="content-wrapper">
                    <Header as='h2' style={{ display: "flex", marginBottom: 10 }}>
                      <div>
                        <Icon name='map marker alternate'
                              style={{
                                color: "#fff",
                                backgroundColor: "#757575",
                                marginRight: 20
                              }}
                              circular
                        />
                      </div>
                      <Header.Content style={{width: "100%"}}>
                        Location
                        <Header.Subheader>
                          {trip.address}
                        </Header.Subheader>
                        <Divider style={{marginTop: 20, marginBottom: 10}}/>
                      </Header.Content>
                    </Header>

                    <Header as='h2' style={{ display: "flex", marginBottom: 10}}>
                      <div>
                        <Icon name='calendar outline'
                              style={{
                                color: "#fff",
                                backgroundColor: "#757575",
                                marginRight: 20
                              }}
                              circular
                        />
                      </div>
                      <Header.Content style={{width: "100%"}}>
                        Date
                        <Header.Subheader>
                          {formatDate(trip.date)}
                        </Header.Subheader>
                        <Divider style={{marginTop: 20, marginBottom: 10}}/>
                      </Header.Content>
                    </Header>

                    <Header as='h2' style={{ display: "flex", marginBottom: 10}}>
                      <div>
                        <Icon name='cut'
                              style={{
                                color: "#fff",
                                backgroundColor: "#757575",
                                marginRight: 20
                              }}
                              circular
                        />
                      </div>
                      <Header.Content style={{width: "100%"}}>
                        Supplies
                        <Header.Subheader>
                          {trip.supplies}
                        </Header.Subheader>
                        <Divider style={{marginTop: 20, marginBottom: 10}}/>
                      </Header.Content>
                    </Header>

                    <Header as='h2' style={{ display: "flex"}}>
                      <div>
                        <Icon name='money bill alternate outline'
                              style={{
                                color: "#fff",
                                backgroundColor: "#757575",
                                marginRight: 20
                              }}
                              circular
                        />
                      </div>
                      <Header.Content>
                        Cost
                        <Header.Subheader>
                          ${trip.cost}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column className="wrapper-map">
                <TripGMap
                  onMount={onMapMount}
                  address={trip.address}
                  tripName={trip.name}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div className="trip-summary-wrapper">
                <h2>
                  Additional Notes / Trip Summary: {trip.field_trip_details}
                </h2>
              </div>
            </Grid.Column>
          </Grid.Row>
          {user.role === "teacher" || user.role === "chaperone" ? (
            <ChaperoneFieldTripDetailView trip={trip} />
          ) : null}
        </Grid>

        <StudentsReadOnlyTable students={students} />

        <TeacherFieldTripDetailView
          setError={setError}
          error={error}
          setStudentInfo={setStudentInfo}
          studentInfo={studentInfo}
          trip={trip}
          students={students}
          statusIncompleteCount={statusIncompleteCount}
          totalCount={totalCount}
          totalPages={totalPages}
          activePage={activePage}
          setActivePage={setActivePage}
          handleSort={handleSort}
          onKeyDownSearchChange={onKeyDownSearchChange}
          query={query}
          onSearchClear={onSearchClear}
          sortBy={sortBy}
          direction={direction}
          onPaginationChange={onPaginationChange}
          onDeleteMessageConfirmation={onDeleteMessageConfirmation}
          lastAddedStudentStatusID={lastAddedStudentStatusID}
          parentList={parentList}
          setIsSuccessfullyAdded={setIsSuccessfullyAdded}
          isSuccessfullyAdded={isSuccessfullyAdded}
          _handleSubmit={_handleSubmit}
          _handleChange={_handleChange}
          setChaperones={setChaperones}
          chaperones={chaperones}
          onHandleCheckbox={onHandleCheckbox}
          match={match}
        />
        <ChaperonesTable chaperones={chaperones} />
      </Container>
    </>
  );
};

export default FieldTripDetails;
