import React from 'react';
import { Button, Header, Modal, Grid } from 'semantic-ui-react';
import './index.css';


export default () => {
  return (
    <>

     <Modal size="large"  trigger={<Button>
      Sign Up
    </Button>}>
      <Modal.Header className='modalHeader'>School Look Up</Modal.Header>
      <Modal.Content>

        <Grid className="gridContainer" columns={2}>

          <Grid.Column className="gridColumn">
            <Header>
              For Teachers
        </Header>
            <Button>Sign Up</Button>
          </Grid.Column>

          <Grid.Column className="gridColumn">
            <Header>
             Hello
         </Header>
            <Button>Sign Up</Button>
          </Grid.Column>
        </Grid>

      </Modal.Content>
    </Modal>

    </>
  )
}