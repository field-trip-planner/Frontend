import React from "react";
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

const ChaperonesTable = ({ chaperones, setChaperones }) => {
  const [user] = useGlobal("user");

  const handleRemoveChaperone = (e) => {
    console.log(e.target.value)
    console.log('before', chaperones)
    const newChaperones = chaperones.filter(chaperone => {
      return e.target.value !== chaperone.id;
    })
    //  setChaperones(newChaperones);
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
                    <Popup flowing hoverable
                        trigger={
                          <Table.Row key={chaperone.id}>
                            <Table.Cell>
                              {`${chaperone.first_name}, ${chaperone.last_name}`}
                            </Table.Cell>
                          </Table.Row>
                        }>

                        <Grid centered columns={1}>
                          <Grid.Column textAlign='center'>
                          
                            <Button value={chaperone.id} negative
                            onClick={(e) => handleRemoveChaperone(e)}
                            >Remove Chaperone</Button>
                          </Grid.Column>
                        </Grid>
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
