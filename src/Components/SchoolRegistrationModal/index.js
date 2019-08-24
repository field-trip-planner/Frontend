import React from 'react';
import { Modal, Container, Button, Input, Form, Dropdown } from 'semantic-ui-react';
import './schoolRegistrationModal.css'

const categories = [
  {
    key: 'Elementary School',
    text: 'Elementary School',
    value: 'Elementary School'
  },
  {
    key: 'Middle School',
    text: 'Middle School',
    value: 'Middle School'
  },
  {
    key: 'High School',
    text: 'High School',
    value: 'High School'
  },

]

export default () => {

  return (
    <>
      <Modal className="modal" size="large" trigger={<span className="schoolRegRedirect">
        Click here</span>}>
        <Modal.Header className='modalHeader'>School Registration</Modal.Header>
        <Modal.Content>
          <Container className="contentContainer" textAlign="center">
            <Form>
              <Form.Field>
                <input placeholder="School Name" />
              </Form.Field>
              <Form.Field>
                <input placeholder="Address" />
              </Form.Field>
              <Form.Field>
                <input placeholder="City" />
              </Form.Field>
              <Form.Field>
                <input placeholder="State" />
              </Form.Field>
              <Form.Field>
                <input placeholder="Zip Code" />
              </Form.Field>
              <Dropdown
                placeholder="Category"
                selection
                options={categories}
              />
            </Form>

            <Button>Submit</Button>
          </Container>
        </Modal.Content>
      </Modal>
    </>
  )
}