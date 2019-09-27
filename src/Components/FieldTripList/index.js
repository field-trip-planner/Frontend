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
  const [user, setUser] = useGlobal("user");

  useEffect(() => {
    if (user.role === "parent") {
      return null;
    } else {
      api
        .get("fieldtrips")
        .then(({ data }) => {
          console.log("TRIP-LIST:", data);
          return setTrips(data);
        })
        .catch(err => err);
    }
  }, []); // 2nd param is arr to stop re-render

  const _handleSearch = e => {
    updateSearch(e.target.value);
    console.log(search);
  };
  const searchTrip = trips.filter(trip => {
    return trip.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  const onSubmitSuccess = () => {
    api
      .get("fieldtrips")
      .then(({ data }) => {
        console.log("TRIP-LIST:", data);
        return setTrips(data);
      })
      .catch(err => err);
  };
  if (user.role === "parent") {
    return (
      <>
        <MainMenu />
        <Container>
          <Header>UPCOMING FIELD TRIPS</Header>
          <Divider />
        </Container>
      </>
    );
  } else {
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
            {user.role === "parent" ? null : (
              <CreateTripModal size="small" onSubmitSuccess={onSubmitSuccess} />
            )}
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
  }
};

export default withRouter(FieldTripList);
