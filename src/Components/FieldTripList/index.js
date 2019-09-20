import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import api from "../../api";
import { useGlobal } from "reactn";
import { Card, Divider, Input, Header, Container } from "semantic-ui-react";

import TripItem from "./TripItem";
import CreateTripModal from "../CreateTripModal/";
import MainMenu from "../layout/Menu";

const FieldTripList = props => {
  const [trips, setTrips] = useGlobal("trips");
  const [search, updateSearch] = useState("");

  const [user] = useGlobal("user");
  console.log('FT user obj >>>>>>>>> ', user);

  useEffect(() => {
    api
      .get("fieldtrips")
      .then(({ data }) => {
        console.log("TRIP-LIST:", data);
        return setTrips(data);
      })
      .catch(err => err);
  }, []); // 2nd param is arr to stop re-render

  const userTrips = trips.filter(list => {
    return list.creator_id === user.id;
  });

  console.log('@@@ users trips ', userTrips);


  const _handleSearch = e => {
    updateSearch(e.target.value);
    console.log(search);
  };

 const searchTrip = userTrips.filter(trip => {
  return trip.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });


  const tripsFound = search ? searchTrip : userTrips;

const onSubmitSuccess = () =>{
  api
    .get("fieldtrips")
    .then(({ data }) => {
      console.log("TRIP-LIST:", data);
      return setTrips(data);
    })
    .catch(err => err);
}

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

          <CreateTripModal size="small"  onSubmitSuccess ={onSubmitSuccess}/>
        </div>

        <Header>UPCOMING FIELD TRIPS</Header>

        <Divider />

        {tripsFound
          ?
            <Card.Group itemsPerRow={3}>
              {tripsFound.map(trip => (
                <TripItem key={trip.id} trip={trip} />
              ))}            
            </Card.Group>
          :
            null      
        }

      </Container>
    </>
  );
};

export default withRouter(FieldTripList);
