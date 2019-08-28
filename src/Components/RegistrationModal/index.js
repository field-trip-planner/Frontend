import React, { useState } from "react";
import { Header, Modal, Grid, Button, Icon } from "semantic-ui-react";
import SchoolLookupModal from "../SchoolLookupModal";
import "./registrationModal.css";
import ParentRegistrationModal from "../ParentRegistrationModal";

const RegistrationModal = ({ element }) => {
  const [modalOpen, updateModalOpen] = useState(false);

  const _handleOpen = e => {
    updateModalOpen(true);
  };

  const _handleClose = e => {
    updateModalOpen(false);
  };

  return (
    /*We want the open prop to have a false/neutral value before clicking on the trigger.
    Once the trigger is clicked the value on the open prop will switch to true and the
    modal will open. Once we click on the button to close the modal the value on the 
    open prop will switch to false*/

    <Modal
      className="modal"
      size="large"
      trigger={
        <Button onClick={_handleOpen} primary size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      }
      open={modalOpen}
      close={_handleClose}
    >
      <Modal.Header className="modalHeader">Registration</Modal.Header>
      <Modal.Content>
        <Grid className="gridContainer" columns={2}>
          <Grid.Column className="gridColumn">
            <Header>For Teachers</Header>
            <Modal.Actions>
              {/* <button onClick={_handleClose}></button> */}
              <SchoolLookupModal test={_handleClose} />
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
