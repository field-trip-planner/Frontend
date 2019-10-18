import React from "react";
import { Grid, Card, Icon, Image, Container } from "semantic-ui-react";

import { Link } from "react-router-dom";
// import { tsPropertySignature } from "@babel/types";

const TripItem = ({ trip }) => {
  const formatDate = time => {
    let date = new Date(time).toLocaleDateString();
    return date;
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Card>
      <Card.Content>
        <Link to={`/trip/${trip.id}`}>
          <Image src={require("../../img/water.jpg")} />

          <Card.Header>{trip.name}</Card.Header>
          <Card.Meta>
            <span>Location: {trip.address}</span>
            <p>Date of Trip: {formatDate(trip.date)}</p>
          </Card.Meta>

          <Card.Description>
            <p>Cost: ${numberWithCommas(trip.cost)}</p>
            <p>Field Trip Details: {trip.field_trip_details}</p>
          </Card.Description>
          <Card.Description>
            <p>Supplies Needed:{trip.supplies}</p>
          </Card.Description>
          {trip.students ? (
            <Card.Description>
              <Container textAlign="center">
                <Icon name="student" />
                {trip.students.map(student => {
                  return (
                    <p key={student.id}>
                      {student.first_name} {student.last_name}
                    </p>
                  );
                })}
              </Container>
            </Card.Description>
          ) : null}
        </Link>
      </Card.Content>
    </Card>
  );
};

export default TripItem;
