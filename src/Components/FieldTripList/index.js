import React from "react";
import {
  Grid,
  Menu,
  Card,
  Divider,
  Input,
  Button,
  Header,
  Icon,
  Container
} from "semantic-ui-react";

import TripItem from "./TripItem";
import CreateTripModal from '../CreateTripModal/';

const fieldTripList = [
  {
    name: "Test TRip1",
    address: "123 main st",
    date: "Sep 21, 2019",
    supplies: "bag",
    school_id: 1,
    cost: "$10,000",
    field_trip_details: "eat ya vegetables"
  },
  {
    name: "Trip 2",
    address: "321 south st",
    date: "Sep 21, 2019",
    supplies: "paper",
    school_id: 2,
    cost: "$10",
    field_trip_details: "no smoking"
  },
  {
    name: "Test TRip3",
    address: "chernobyl",
    date: "Sep 21, 2019",
    supplies: "greiger counter",
    school_id: 1,
    cost: "$1000",
    field_trip_details: "half life"
  },
  {
    name: "Trip 4",
    address: "321  st",
    date: "Sep 21, 2019",
    supplies: "bag",
    school_id: 1,
    cost: "$10,000",
    field_trip_details: "eat ya vegetables"
  },
  {
    name: "Trip 5",
    address: "South pole",
    date: "Sep 21, 2019",
    supplies: "penguin suit",
    school_id: 1,
    cost: "$1,000",
    field_trip_details: "happy feet"
  },
  {
    name: "Trip 6",
    address: "The moon",
    date: "Sep 21, 2019",
    supplies: "Oxygen",
    school_id: 3,
    cost: "1,000,000.69",
    field_trip_details: "Objective: Don't Die"
  }
];

export default () => {
  return (
    <>
      <Menu>
        <Menu.Item header>FieldTripp</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Menu>

      <Container>
        <div>
          <Input
            size="large"
            icon="bus"
            iconPosition="left"
            placeholder="Search trips..."
            floated="left"
            />
            
            <CreateTripModal size = 'small'/>
        </div>
          
          <Header>UPCOMING FIELD TRIPS</Header>
             
            
              <Divider />
        <Card.Group itemsPerRow={3}>
          {fieldTripList.map(trip => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </Card.Group>
      </Container>
    </>
  );
};
