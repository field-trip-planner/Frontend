import React from "react";
import { Link } from "react-router-dom";
import { Container, Divider, Embed, Grid, Image } from 'semantic-ui-react';
import signUpGif from '../../img/fieldtrip_newModal.gif';
import createTripGif from '../../img/createTrip.gif';
import studentTableGif from '../../img/trip_status_search_complete.gif';
import "./landingPage.css";

const MainContent = () => {

  return (
    <>
      <Container style={{ marginTop: "70px", marginBottom: "70px" }}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div id="sign-up-gif" className="landing-page-img-wrapper">
                <Image src={signUpGif} />
              </div>
            </Grid.Column>

            <Grid.Column className="content-text-wrapper">
              <div className="landing-page-img-wrapper">
                <p className="content-text">Sign up is as easy as 1-2-3</p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <Container style={{ marginTop: "70px", marginBottom: "70px" }}>
        <Divider />
      </Container>

      <Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column className="content-text-wrapper">
              <div className="landing-page-img-wrapper">
                <p className="content-text">Easily create field trips using an all-in-one dashboard</p>
              </div>
            </Grid.Column>

            <Grid.Column>
              <div className="landing-page-img-wrapper">
                <Image src={createTripGif} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <Container style={{ marginTop: "70px", marginBottom: "70px" }}>
        <Divider />
      </Container>

      <Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div className="landing-page-img-wrapper">
                <Image src={studentTableGif} />
              </div>
            </Grid.Column>

            <Grid.Column className="content-text-wrapper">
              <div className="landing-page-img-wrapper">
                <p className="content-text">Keeping track of your students' statuses will no longer be a burden with this sortable and searchable table</p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}

export default MainContent;
