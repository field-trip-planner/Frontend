import React from 'react';
import { Button, Modal, Container, Input } from 'semantic-ui-react';
import './index.css';


export default () => {
  return (
    <>

      <Modal size="large" trigger={<Button>
        Sign Up
    </Button>}>
        <Modal.Header className='modalHeader'>School Look Up</Modal.Header>
        <Modal.Content>
          <Container className="contentContainer"textAlign="center">
            <Input className="schoolLookUpSearchBar" size="large" icon='building' iconPosition='left' placeholder='Search Schools...' />
            
            <p>Don't see your school? <a href="#">Click here</a>
            </p>

            <Button>Continue</Button>
          </Container>
        </Modal.Content>
      </Modal>

    </>
  )
}