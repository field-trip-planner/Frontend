import React, { useState } from 'react';
import { useGlobal } from "reactn"
import api from '../../api/index.js'
import { withRouter } from 'react-router-dom'
import { Button, Checkbox, Modal, Form, Input } from 'semantic-ui-react';
import './teacherRegistration.css'

const TeacherRegistrationForm = ({ taco, onSchoolRegister, history }) => {
  const [user, setUser] = useGlobal("user");
  const [school] = useGlobal('school');

  const [teacherCreds, setTeacherCreds] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isTeacher: true,
    school_id: school,
    phone_number: ""
  });
  const [info, setInfo] = useState({
    email:"",
    password:""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setTeacherCreds({
      ...teacherCreds,
      [name] : value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newTeacher = { ...teacherCreds }

    api.post("register",newTeacher)
      .then(res => {
        setTimeout(()=> {
          api
            .post("login", { email: newTeacher.email, password: newTeacher.password })
            .then(res => {
              setUser(res.data.user);
            })
            .catch(err => err)
            history.push("/dashboard")
        }, 2000 )
      })
      .catch(err=> err,"somethin went wrong")
  }

    return (

        <Modal size="small"
        trigger=
          {
            taco === 'school' ? <Button onClick={onSchoolRegister}>
                Register School
              </Button>:

            <Button >
            Register
            </Button>

          } closeIcon>

      <Modal.Header className='modalHeader'>Teacher Registration</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
            <label>First Name</label>

            <input
              placeholder='First Name'
              name="first_name"
              value={teacherCreds.first_name}
              onChange={handleChange}
            />
            </Form.Field>

            <Form.Field>
            <label>Last Name</label>
            <input
              placeholder='Last Name'
              name="last_name"
              value={teacherCreds.last_name}
              onChange={handleChange}
            />
            </Form.Field>

            <Form.Field>
            <label>Email</label>
            <input
              placeholder='email@domain.com'
              name = "email"
              value = {teacherCreds.email}
              onChange={handleChange}
            />
            </Form.Field>

            {/* <Form.Field>
            <label>Username</label>
            <input
              placeholder='Username'
              name="username"
              value = {teacherCreds.username}
              onChange={handleChange}
            />
            </Form.Field> */}

            <Form.Field>
            <label>Password</label>
            <Input
              type='password'
              placeholder='Please dont make it password'
              name = "password"
              value = {teacherCreds.password}
              onChange = {handleChange}
            />
            </Form.Field>

            <Form.Field>
            <label>Phone Number</label>
            <input
              placeholder='(123)456-7890'
              name = "phone_number"
              value = {teacherCreds.phone_number}
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
    )
}

export default withRouter(TeacherRegistrationForm)
