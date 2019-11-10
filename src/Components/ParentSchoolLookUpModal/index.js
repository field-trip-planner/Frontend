import React, {useState, useEffect } from 'react';
import api from "../../api/index.js";
import { useGlobal } from 'reactn';
import { Modal, Button, Container, Icon } from 'semantic-ui-react'

import School from '../SVGs/School'
import "../SchoolLookupModal/schoolLookupModal.css";

const ParentalSchoolLookUp = ({ setStepNumber, stepNumber }) => {
  const [school, setSchool] = useGlobal("school")
  const [schools, setSchools] = useState([])

  useEffect(() => {
    api()
      .get("schools")
      .then(({ data }) => {
        setSchools(data)
        // console.log("SCHOOL LIST DATA ", data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const _handleChange = e => {
    e.preventDefault()
    setSchool(e.target.value)

  }

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

            <div className="flex-container flex-container-parent">
              <div className="">
                <div className="school-icon">
                  <School />
                </div>
                <select name="school_id" id="" onChange={_handleChange}>
                  <option value="default">Choose your school</option>
                  {schools.map(school => {
                    return (
                      <option key={school.id} value={school.id}>
                        {school.school_name}
                      </option>
                    );
                  })}
                </select>
                <div className="school-parent-reg-btn">
                  <Button onClick={() => setStepNumber(3)}>Register</Button>
                </div>
              </div>
            </div>
          </Container>
        </Modal.Content>
      </>
  )
}

export default ParentalSchoolLookUp
