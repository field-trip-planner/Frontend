import React, { useState, useEffect } from "react";
import { Container, Modal, Form, Message, Icon } from 'semantic-ui-react'
import { useGlobal } from "reactn";
import { withRouter } from "react-router-dom";
import api from "../../api";

import './parentRegistrationModal.css';
import "../SchoolLookupModal/schoolLookupModal.css";

const ParentRegistrationModal = props => {
  const [school, setSchool] = useGlobal("school");
  const [schools, setSchools] = useState([]);
  const [user, setUser] = useGlobal("user");
  const [handleState, setHandleState] = useState({
    success: false,
    failed: false,
    message: ""
  });
  useEffect(() => {
    api()
      .get("schools")
      .then(({ data }) => {
        setSchools(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    school_id:"",
    role: "parent",
    confirm_password: "",
    phone_number: "",
    googleId: null
  });

  const _handleChange = e => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      school_id: school,
      [name]: value
    });
  };

  const _handleSubmit = async () => {
    const newUser = { ...info }; //
    delete newUser.confirm_password;
    if (info.password !== info.confirm_password) {
      setHandleState({ failed: true, message: "Invalid Password" });
      setTimeout(() => {
        setHandleState({ failed: false, message: "" });
      }, 2000);
    } else {
      try {
        const newRegister = await api().post("register", newUser);
        if (newRegister) {
          setHandleState({
            success: true,
            message: "Account Created Successfully"
          });
        }
        const newLogin = await api().post("login", {
          email: info.email,
          password: info.password
        });
        setUser(newLogin.data.user);
        if (newLogin && props.history.push("/dashboard"))
          setInfo({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            school_id:"",
            confirm_password: "",
            phone_number: ""
          });
      } catch (e) {
        console.log(e);
        setHandleState({
          failed: true,
          message: "Registration Failed, Try again"
        });
        setTimeout(() => {
          setHandleState({ failed: false, message: "" });
        }, 2000);
      }
    }
  };
  return (
      <>
        <Modal.Header className="modalHeader">
          <div className="modal-header-wrapper">
            <div className="flex-wrapper-arrow-left">
              <div onClick={() => props.setStepNumber(props.stepNumber - 1)}>
                <Icon name="arrow left"/>
                back
              </div>
            </div>

            <div className="flex-wrapper">
            <span>
              Parent Registration
            </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Content>
          {handleState.success && (
            <Message positive content={handleState.message} />
          )}
          {handleState.failed && (
            <Message negative content={handleState.message} />
          )}
          <Container>
            <Form onSubmit={_handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="First Name"
                  name="first_name"
                  value={info.first_name}
                  onChange={_handleChange}
                  required
                />
                <Form.Input
                  fluid
                  label="Last Name"
                  name="last_name"
                  value={info.last_name}
                  onChange={_handleChange}
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Email"
                  type="email"
                  name="email"
                  value={info.email}
                  onChange={_handleChange}
                  required
                />
                <Form.Input
                  fluid
                  label="Phone"
                  placeholder="555-222-3423"
                  name="phone_number"
                  value={info.phone_number}
                  onChange={_handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Password"
                  type="password"
                  name="password"
                  value={info.password}
                  onChange={_handleChange}
                  required
                />
                <Form.Input
                  fluid
                  label="Confirm Password"
                  type="password"
                  name="confirm_password"
                  value={info.confirm_password}
                  onChange={_handleChange}
                  required
                />
              </Form.Group>
              <div className="register-parent-btn">
                <Form.Button>Submit</Form.Button>
              </div>
            </Form>
          </Container>
        </Modal.Content>
      </>
  );
};

export default withRouter(ParentRegistrationModal);
