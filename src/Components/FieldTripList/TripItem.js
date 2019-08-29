import React from "react";
import { Grid, Card, Icon, Image } from "semantic-ui-react";

const TripItem = ({ trip }) => {
  return (
    <Card>
      <Image src={require("../../img/water.jpg")} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{trip.name}</Card.Header>
        <Card.Meta>
          <span>Location: {trip.address}</span>
          <p>Date of Trip: {trip.date}</p>
        </Card.Meta>

        <Card.Description>
          <p>Cost:{trip.cost}</p>
          <p>Field Trip Details: {trip.field_trip_details}</p>
        </Card.Description>
        <Card.Description>
          <p>Supplies Needed:{trip.supplies}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default TripItem;
