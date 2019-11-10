import React, { useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import SchoolLookUpForTeacher from "../SchoolLookupModal/";
import RegistrationStepOne from "../RegistrationStepOne/";
import SchoolRegistration from "../SchoolRegistrationModal/";
import TeacherRegistrationForm from "../TeacherRegistrationModal/";
import ParentalSchoolLookUp from "../ParentSchoolLookUpModal/";
import ParentRegistrationModal from "../ParentRegistrationModal/";

import "./registrationModal.css";

const RegistrationModal = () => {
  const [stepNumber, setStepNumber] = useState(1);
  const [type, setType] = useState('teacher');

  const getRegisterComponent = () => {
    if (type === 'teacher' ) {
      if(stepNumber === 1){
        return (
          <RegistrationStepOne
            setStepNumber={setStepNumber}
            setType={setType}
          />
        )
      }
      if (stepNumber === 2) {
        return (
          <SchoolLookUpForTeacher
            setStepNumber={setStepNumber}
          />
        )
      }
      if (stepNumber === 3) {
        return (
          <SchoolRegistration
            setStepNumber={setStepNumber}
          />
        )
      }
      if (stepNumber === 4) {
        return (
          <TeacherRegistrationForm
            setStepNumber={setStepNumber}
          />
        )
      }
    }

    if (type === 'parent') {
      if (stepNumber === 1) {
        return (
          <RegistrationStepOne
            setStepNumber={setStepNumber}
            setType={setType}
          />
        )
      }
      if (stepNumber === 2) {
        return (
          <ParentalSchoolLookUp
            setStepNumber={setStepNumber}
          />
        )
      }
      if (stepNumber === 3) {
        return (
          <ParentRegistrationModal
            setStepNumber={setStepNumber}
          />
        )
      }
    }
  }

  return (
    /*We want the open prop to have a false/neutral value before clicking on the trigger.
    Once the trigger is clicked the value on the open prop will switch to true and the
    modal will open. Once we click on the button to close the modal the value on the
    open prop will switch to false*/

    <Modal
      className="modal"
      size="tiny"
      closeIcon
      trigger={
        <Button size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      }
      onClose={() => setStepNumber(1)}
    >
      { getRegisterComponent() }
    </Modal>
  );
};

export default RegistrationModal;
