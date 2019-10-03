import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import api from "../../api";
import { useGlobal } from "reactn";
import { Card, Divider, Input, Header, Container } from "semantic-ui-react";
import TripItem from "./TripItem";
import CreateTripModal from "../CreateTripModal/";
import MainMenu from "../layout/Menu";

const FieldTripList = props => {
  //  state, setter          // property in GlobalState
  const [trips, setTrips] = useGlobal("trips");
  const [search, updateSearch] = useState("");

  const [user] = useGlobal("user");
  //students state obj for parents' field trip cards
  // const [students, setStudents] = useState([]);

  useEffect(() => {
    /*User specific field trip population. The requests will differ based on the user role.
    Teacher, Parent, Chaperone will have different endpoints to make their requests to.*/
    if (user.role === "teacher") {
      api()
        .get(`myfieldtrips/teacher/${user.id}`)
        .then(({ data }) => {
          return setTrips(data);
        })
        .catch(err => console.log(err));
    } else if (user.role === "parent") {
      api()
        .get(`myfieldtrips/parent/${user.id}`)
        .then(({ data }) => {
          console.log(data);
          return setTrips(data);
        })
        .catch(err => console.log(err));
    } else if (user.role === "chaperone") {
      api()
        .get(`myfieldtrips/chaperone/${user.id}`)
        .then(({ data }) => {
          return setTrips(data);
        })
        .catch(err => console.log(err));
    }
  }, [user.role, user.id, setTrips]);

  const _handleSearch = e => {
    updateSearch(e.target.value);
    console.log(search);
  };
  const searchTrip = trips.filter(trip => {
    return trip.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <>
      <MainMenu />
      <Container>
        <div>
          <Input
            onChange={_handleSearch}
            size="large"
            icon="bus"
            iconPosition="left"
            placeholder="Search trips..."
            floated="left"
            value={search}
          />

          <CreateTripModal size="small" />
        </div>

        <Header>UPCOMING FIELD TRIPS</Header>

        <Divider />
        {search === "" ? (
          <Card.Group itemsPerRow={3}>
            {trips.map(trip => (
              <TripItem key={trip.id} trip={trip} />
            ))}
          </Card.Group>
        ) : (
          <Card.Group itemsPerRow={3}>
            {searchTrip.map(trip => (
              <TripItem key={trip.id} trip={trip} />
            ))}
          </Card.Group>
        )}

        {/* <Card.Group itemsPerRow={3}>

          {fieldTripList.map(trip => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </Card.Group> */}
      </Container>
    </>
  );
};

export default withRouter(FieldTripList);
