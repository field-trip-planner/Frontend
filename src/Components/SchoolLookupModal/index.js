import React, { useState, useEffect } from "react";
import { Button, Modal, Container, Icon } from "semantic-ui-react";
import api from "../../api";
import { useGlobal } from "reactn";
import School from '../SVGs/School'
import "./schoolLookupModal.css";

const SchoolLookUpForTeacher = ({ setStepNumber, stepNumber }) => {
  const [school, setSchool] = useGlobal("school");
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    //setSchool("")
    api()
      .get("schools")
      .then(({ data }) => {
        setSchools(data);
        // console.log("DATA", data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setSchool(e.target.value);
    // console.log("SET SCHOOL ID UPON LOOKUP", e.target.value)
  };

  return (
    <>
      <Modal.Header className="modalHeader">
        <div className="modal-header-wrapper">
          <div className="flex-wrapper-arrow-left">
            <div onClick={() => setStepNumber(stepNumber - 1)}>
              <Icon name="arrow left"/>
              back
            </div>
          </div>

          <div className="flex-wrapper">
            <span>
              School Look Up
            </span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Content className="school-modal-content">
        <Container className="contentContainer" textAlign="center">
          {/* <Input
            className="schoolLookUpSearchBar"
            size="large"
            icon="building"
            iconPosition="left"
            placeholder="Search Schools..."
          /> */}
          <div className="flex-container">
            <div className="school-lookup-wrapper">

              <div className="school-icon">
                <School />
              </div>

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
              <div className="school-teacher-reg-btn">
                <Button onClick={() => setStepNumber(4)}>Register</Button>
              </div>

              <div className="school-redirect-wrapper">
                <p>
                  <span className="school-redirect-text">
                    Don't see your school?
                  </span>
                  <Button className="school-redirect-btn"
                          size="mini"
                          style={{
                            backgroundColor: "transparent",
                            textDecoration: "underline",
                            fontSize: 14,
                            padding: "unset",
                            fontWeight: "unset",
                            fontStyle: "italic"
                          }}
                          onClick={() => setStepNumber(3)}
                  >
                    Register your school.
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Modal.Content>
    </>
  );
};

export default SchoolLookUpForTeacher;
