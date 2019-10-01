import React from 'react';
import { Grid } from 'semantic-ui-react';

const ChaperoneFieldTripDetailView = ({ trip }) => {

  return (
    <>
      <Grid.Row columns={1}>
        <Grid.Column>
          <div className="trip-summary-wrapper">
            <h2>
              Chaperone Tasks: {" "}
              {trip.chaperoneTasks}
            </h2>
          </div>
        </Grid.Column>
      </Grid.Row>
    </>
  )
};

export default ChaperoneFieldTripDetailView;
