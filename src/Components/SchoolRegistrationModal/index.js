import React, {useState} from 'react';
import { Modal, Container, Button, Input, Form, Dropdown } from 'semantic-ui-react';
import './schoolRegistrationModal.css'
import TeacherRegistrationForm from '../TeacherRegistrationModal/index.js'
import { useGlobal } from 'reactn';
import api from '../../api';

// const gradeLevels = [
//
//   {
//     key: 'Elementary School',
//     text: 'Elementary School',
//     value: 'Elementary School',
//   },
//   {
//     key: 'Middle School',
//     text: 'Middle School',
//     value: 'Middle School',
//   },
//   {
//     key: 'High School',
//     text: 'High School',
//     value: 'High School',
//   },
//
// ]

const SchoolRegistration = () => {

  const [school, setSchool] = useGlobal('school');

  const [schoolInfo, setSchoolInfo] = useState({
    school_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    category: ""
  });

  const _handleChange = (e) => {
    const { name, value } = e.target;

    console.log('SElected:::', value);

    setSchoolInfo({
      ...schoolInfo,
      [name]: value

    });

    console.log('schoolINFO:', schoolInfo);
  };

  const onSchoolRegister = async (e) => {
    e.preventDefault();
    console.log('WORKING?????')

    try {

      const school = await api.post("schools", schoolInfo);

      console.log("School ID::", school.data.id)

      setSchool(school.data.id)

    }
    catch (err){
      console.log(err);

    }

  };

  return (
    <>
      <Modal
        className="modal"
        size="large"
        trigger={
          <span className="schoolRegRedirect">
            Click here
          </span>
        }
      >
        <Modal.Header className='modalHeader'>
          School Registration
        </Modal.Header>
        <Modal.Content>
            <Form className="schoolForm">
              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='School Name'
                  placeholder='School Name'
                  name='school_name'
                  value={schoolInfo.school_name}
                  onChange={_handleChange}
                />
                <Form.Field
                  control='select'
                  name='category'
                  label='Grade Level'
                  placeholder='Grade Level'
                  onChange={_handleChange}
                >
                  <option
                    value="default"
                  >
                    Choose your school
                  </option>
                  <option
                    value='Elementary School'
                  >
                    Elementary School
                  </option>
                  <option
                    value='Middle School'
                  >
                    Middle School
                  </option>
                  <option
                    value='High School'
                  >
                    High School
                  </option>
                </Form.Field>

              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='Address'
                  placeholder='Address'
                  name='address'
                  value={schoolInfo.address}
                  onChange={_handleChange}
                />
                <Form.Field
                  control={Input}
                  label='City'
                  placeholder='City'
                  name='city'
                  value={schoolInfo.city}
                  onChange={_handleChange}
                />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='State'
                  placeholder='State'
                  name='state'
                  value={schoolInfo.state}
                  onChange={_handleChange}
                />
                <Form.Field
                  control={Input}
                  label='Zip Code'
                  placeholder='Zip Code'
                  name='zip_code'
                  value={schoolInfo.zip_code}
                  onChange={_handleChange}
                />
              </Form.Group>
            </Form>

          {/*<Button onClick={onSchoolRegister}> hello </Button>*/}

            <TeacherRegistrationForm
              onSchoolRegister={onSchoolRegister}
              taco={'school'}
            />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default SchoolRegistration;
