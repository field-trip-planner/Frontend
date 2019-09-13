import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import api from "../../api";
import { useGlobal } from "reactn";
import { Card, Divider, Input, Header, Container } from "semantic-ui-react";

import TripItem from "./TripItem";
import CreateTripModal from "../CreateTripModal/";
import MainMenu from "../layout/Menu";

export const fieldTripList = [
  {
    id: 1,
    name: "Test TRip1",
    address: "123 main st",
    date: "Sep 21, 2019",
    supplies: "bag",
    school_id: 1,
    cost: "$10,000",
    field_trip_details: "eat ya vegetables"
  },
  {
    id: 2,
    name: "Trip 2",
    address: "321 south st",
    date: "Sep 21, 2019",
    supplies: "paper",
    school_id: 2,
    cost: "$10",
    field_trip_details: "no smoking"
  },
  {
    id: 3,
    name: "Test TRip3",
    address: "chernobyl",
    date: "Sep 21, 2019",
    supplies: "greiger counter",
    school_id: 1,
    cost: "$1000",
    field_trip_details: "half life"
  },
  {
    id: 4,
    name: "Trip 4",
    address: "321  st",
    date: "Sep 21, 2019",
    supplies: "bag",
    school_id: 1,
    cost: "$10,000",
    field_trip_details: "eat ya vegetables"
  },
  {
    id: 5,
    name: "Trip 5",
    address: "South pole",
    date: "Sep 21, 2019",
    supplies: "penguin suit",
    school_id: 1,
    cost: "$1,000",
    field_trip_details: "happy feet"
  },
  {
    id: 6,
    name: "Trip 6",
    address: "The moon",
    date: "Sep 21, 2019",
    supplies: "Oxygen",
    school_id: 3,
    cost: "1,000,000.69",
    field_trip_details: "Objective: Don't Die"
  }
];

const FieldTripList = props => {
  //  state, setter          // property in GlobalState
  const [trips, setTrips] = useGlobal("trips");
  const [search, updateSearch] = useState("");

  useEffect(() => {
    api
      .get("fieldtrips")
      .then(({ data }) => {
        console.log("TRIP-LIST:", data);
        return setTrips(data);
      })
      .catch(err => err);
  }, []); // 2nd param is arr to stop re-render

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
