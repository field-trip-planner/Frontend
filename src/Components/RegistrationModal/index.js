import React from "react";
import { Header, Modal, Grid, Button, Icon } from "semantic-ui-react";
import SchoolLookupModal from "../SchoolLookupModal";
import "./registrationModal.css";
import ParentRegistrationModal from "../ParentRegistrationModal";
import ParentalSchoolLookUpModal from "../ParentSchoolLookUpModal/index.js"

const RegistrationModal = () => {

  return (
    /*We want the open prop to have a false/neutral value before clicking on the trigger.
    Once the trigger is clicked the value on the open prop will switch to true and the
    modal will open. Once we click on the button to close the modal the value on the
    open prop will switch to false*/

    <Modal
      className="modal"
      size="tiny"
      trigger={
        <Button size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      }
    >
      <Modal.Header className="modalHeader">Registration</Modal.Header>
      <Modal.Content>
        <Grid className="gridContainer" columns={2}>
          <Grid.Column className="gridColumn">
            <Header>For Teachers</Header>
            <Modal.Actions>
              <SchoolLookupModal />
            </Modal.Actions>
          </Grid.Column>

          <Grid.Column className="gridColumn">
            <Header>For Parents</Header>
            <Modal.Actions>
              {/* <ParentRegistrationModal /> */}
              {/* ADD PARENTAL SCHOOL LOOKUP HERE */}
              <ParentalSchoolLookUpModal />
            </Modal.Actions>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

export default RegistrationModal;
