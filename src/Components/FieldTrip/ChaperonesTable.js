import React, { useState } from "react";
import { useGlobal } from "reactn";
import {
  Header,
  Icon,
  Segment,
  Table,
  Popup,
  Grid,
  Button
} from 'semantic-ui-react'
import api from '../../api';

const ChaperonesTable = ({ chaperones, setChaperones, fieldTripId }) => {
  const [user] = useGlobal("user");
  const [newPopup, setNewPopup] = useState(false);
  const [doNotShowThis, setDoNotShowThis] = useState(false);

  const handleRemoveChaperone = (e) => {
    //Once the api call is made, will await for an ok status from api call before updating state
    const chaperoneId = e.target.value;
    api()
      .delete(`chaperones_field_trips/${fieldTripId}/${chaperoneId}`)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          const newChaperones = chaperones.filter(chaperone => {
            return chaperoneId !== chaperone.id;
          })
          setChaperones(newChaperones);
        }
      }).catch(err => console.log(err))

  }

  const handleShowNewPopup = (e) => {
    setNewPopup(true);
  }

  return (
    <>
      {
        (user.role === "parent" || user.role === "chaperone") ?
          (
            <Segment basic clearing style={{ padding: "unset", marginTop: 80 }}>
              <Header as='h2' floated='left'>Chaperones</Header>
              <Table columns={1} style={{ marginTop: 20, marginBottom: 50 }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Full Name</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {chaperones.map(chaperone => {
                    return (
                      <Table.Row key={chaperone.id}>
                        <Table.Cell>
                          {`${chaperone.first_name}, ${chaperone.last_name}`}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Segment>
          )
          :
          (
            <Table columns={1} style={{ marginTop: 20, marginBottom: 50 }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Full Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {chaperones.map(chaperone => {
                  return (
                    <Popup flowing hoverable position='top left'
                      trigger={
                        <Table.Row key={chaperone.id}>
                          <Table.Cell>
                            {`${chaperone.first_name}, ${chaperone.last_name}`}
                          </Table.Cell>
                        </Table.Row>
                      }>





                      {/* <Grid centered columns={1}>
                        <Grid.Column textAlign='center'>

                          <Button value={chaperone.id} negative
                            onClick={(e) => handleRemoveChaperone(e)}
                          >Remove Chaperone</Button>
                        </Grid.Column>
                      </Grid> */}

                      {newPopup ?
                        <Grid centered columns={1}>
                          <Grid.Column textAlign='center'>
                            <h3>Are You Sure?</h3>
                            <Button value={chaperone.id} positive
                              onClick={(e) => {
                                handleRemoveChaperone(e);
                                setNewPopup(false)
                              }}
                            >Yes</Button>
                            <Button value={chaperone.id} negative
                              onClick={(e) => setNewPopup(false)}
                            >No</Button>
                          </Grid.Column>
                        </Grid>
                        :
                        <Grid centered columns={1}>
                          <Grid.Column textAlign='center'>
                            <h3>Remove From Field Trip</h3>
                            <Button value={chaperone.id} negative
                              onClick={(e) => {
                                if (doNotShowThis) {
                                  handleRemoveChaperone(e)
                                }else{
                                  handleShowNewPopup(e)
                                }

                              }}
                            >Remove Chaperone</Button>
                          </Grid.Column>
                        </Grid>
                      }





                    </Popup>
                  );
                })}
              </Table.Body>
            </Table>
          )
      }
    </>
  );
}

export default ChaperonesTable;
