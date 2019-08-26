import React from "react";
import { Button, Header, Modal, Grid, Icon } from "semantic-ui-react";
import SchoolLookupModal from "../SchoolLookupModal";
import "./registrationModal.css";
import ParentRegistrationModal from "../ParentRegistrationModal";

const RegistrationModal = () => {
  return (
    <Modal
      className="modal"
      size="large"
      trigger={
        <Button primary size="huge">
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
              <ParentRegistrationModal />
            </Modal.Actions>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

export default RegistrationModal;
