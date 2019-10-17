import React, { useState } from "react";
import { useGlobal } from "reactn";
import api from "../../api/index.js";
import { withRouter } from "react-router-dom";
import { Button, Checkbox, Modal, Form, Input } from "semantic-ui-react";
import "./teacherRegistration.css";

const TeacherRegistrationForm = ({ taco, onSchoolRegister, history }) => {
  const [user, setUser] = useGlobal("user");
  const [school, setSchool] = useGlobal("school");
  
  const [teacherCreds, setTeacherCreds] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "teacher",
    password: "",
    school_id: "",
    phone_number: "",
    googleId: null
  });

  const [info, setInfo] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setTeacherCreds({
      ...teacherCreds,
      school_id: school,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newRegister = await api().post("register", teacherCreds);
      const newLogin = await api().post("login", {
        email: teacherCreds.email,
        password: teacherCreds.password
      });
      setUser(newLogin.data.user);
      history.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      size="small"
      trigger={
        taco === "school" ? (
          <Button onClick={onSchoolRegister}>Register School</Button>
        ) : (
          <Button>Register</Button>
        )
      }
      closeIcon
    >
      <Modal.Header className="modalHeader">Teacher Registration</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>First Name</label>

            <input
              placeholder="First Name"
              name="first_name"
              value={teacherCreds.first_name}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              name="last_name"
              value={teacherCreds.last_name}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <input
              placeholder="email@domain.com"
              name="email"
              value={teacherCreds.email}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Please dont make it password"
              name="password"
              value={teacherCreds.password}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Phone Number</label>
            <input
              placeholder="(123)456-7890"
              name="phone_number"
              value={teacherCreds.phone_number}
              onChange={handleChange}
            />
          </Form.Field>

          {/* <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field> */}

          <Form.Button primary>Submit</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default withRouter(TeacherRegistrationForm);
