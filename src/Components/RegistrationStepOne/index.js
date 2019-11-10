import React from "react";
import {
  Button,
  Grid,
  Modal,
  Header
} from "semantic-ui-react";
import Teacher from '../SVGs/Teacher';
import Parent from '../SVGs/Parent';

const RegistrationStepOne = ({ setStepNumber, setType }) => {

  return (
    <>
      <Modal.Header className="modalHeader">Registration</Modal.Header>
      <Modal.Content>
        <Grid className="gridContainer" columns={2}>
          <Grid.Column className="gridColumn">
            <div className="svg-icon-wrapper">
              <Teacher />
            </div>
            <Header>For Teachers</Header>
            <Modal.Actions>
              {/*<SchoolLookupModal />*/}
              <Button onClick={() => {
                setType('teacher');
                setStepNumber(2);
              }}>
                Sign Up
              </Button>
            </Modal.Actions>
          </Grid.Column>

          <Grid.Column className="gridColumn grid-column-border">
            <div className="svg-icon-wrapper">
              <Parent />
            </div>
            <Header>For Parents</Header>
            <Modal.Actions>
              {/* <ParentRegistrationModal /> */}
              {/* ADD PARENTAL SCHOOL LOOKUP HERE */}
              {/*<ParentalSchoolLookUpModal />*/}

              <Button onClick={() => {
                setType('parent');
                setStepNumber(2);
              }}>
                Sign Up
              </Button>
            </Modal.Actions>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </>
  );
};

export default RegistrationStepOne;
