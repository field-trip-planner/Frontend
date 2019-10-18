import React, { useState, useEffect } from "react";
import { Button, Modal, Container, Input, Dropdown } from "semantic-ui-react";
import api from "../../api";
import { useGlobal } from "reactn";
import SchoolRegistrationModal from "../SchoolRegistrationModal";
import "./schoolLookupModal.css";
import TeacherRegistrationForm from "../TeacherRegistrationModal/index.js";

const SchoolLookUp = () => {
  const [school, setSchool] = useGlobal("school");
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    //setSchool("")
    api()
      .get("schools")
      .then(({ data }) => {
        setSchools(data);
        console.log("DATA", data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setSchool(e.target.value);
    console.log("SET SCHOOL ID UPON LOOKUP", e.target.value)
  };

  return (
    <>
      <Modal className="modal" size="large" trigger={<Button>Sign Up</Button>}>
        <Modal.Header className="modalHeader">School Look Up</Modal.Header>
        <Modal.Content>
          <Container className="contentContainer" textAlign="center">
            {/* <Input
              className="schoolLookUpSearchBar"
              size="large"
              icon="building"
              iconPosition="left"
              placeholder="Search Schools..."
            /> */}

            <select name="school" id="" onChange={handleChange}>
              <option value="default">Choose your school</option>
              {schools.map(school => {
                return (
                  <option key={school.id} value={school.id}>
                    {school.school_name}
                  </option>
                );
              })}
            </select>

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

export default SchoolLookUp;
