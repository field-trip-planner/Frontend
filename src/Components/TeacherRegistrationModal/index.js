import React from 'react';
import { Button, Checkbox, Modal, Form, Input } from 'semantic-ui-react';
import './teacherRegistration.css'

function TeacherRegistraionForm () {
    return (
        <Modal size="small" 
        trigger={
            <Button >
            Register
            </Button>
        }closeIcon>
      
      <Modal.Header className='modalHeader'>Teacher Registration</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
            </Form.Field>
            
            <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
            </Form.Field>

            <Form.Field>
            <label>Username</label>
            <input placeholder='Username' />
            </Form.Field>

            <Form.Field>
            <label>Password</label>
            <Input type='password' placeholder='Please dont make it password'/>
            </Form.Field>

            <Form.Field>
            <label>Phone Number</label>
            <input placeholder='(123)456-7890' />
            </Form.Field>
            
            <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            
            <Form.Button primary>Submit</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
    )
} 

export default TeacherRegistraionForm