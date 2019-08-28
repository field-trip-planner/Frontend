import React from 'react';
import { Button, Modal, Container, Input } from 'semantic-ui-react';
import SchoolRegistrationModal from '../SchoolRegistrationModal';
import './schoolLookupModal.css';
import TeacherRegistrationForm from '../TeacherRegistrationModal/index.js'


export default props => {
  return (
    <>
      <Modal
        className="modal"
        size="large"
        trigger={<Button onClick={props.test}>Sign Up</Button>}
      >
        <Modal.Header className="modalHeader">School Look Up</Modal.Header>
        <Modal.Content>
          <Container className="contentContainer" textAlign="center">
            <Input
              className="schoolLookUpSearchBar"
              size="large"
              icon="building"
              iconPosition="left"
              placeholder="Search Schools..."
            />

            <p>
              Don't see your school?
              <SchoolRegistrationModal />
            </p>

            <TeacherRegistrationForm />
          </Container>
        </Modal.Content>
      </Modal>
    </>
  );
};
