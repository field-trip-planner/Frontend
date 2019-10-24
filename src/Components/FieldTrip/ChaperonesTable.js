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
import './ChaperonesTable.css'

const ChaperonesTable = ({ chaperones, setChaperones, fieldTripId }) => {
  const [user] = useGlobal("user");

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
                    <Table.Row key={chaperone.id}>
                      <Table.Cell className="chaperoneCell" selectable collapsing>
                      <div className="chaperoneCell">
                        <div className="chaperoneName">

                      {`${chaperone.first_name}, ${chaperone.last_name}`}
                      </div>
                      <Popup
                        trigger={
                            <div className = "chaperoneTrash" style={{ cursor: 'pointer' }}>
                              <Icon name="trash alternate outline" />
                            </div>
                        }
                        content={
                          <Button negative
                            value={chaperone.id}
                            content='Really delete?'
                            onClick={(e) => handleRemoveChaperone(e)
                            }
                          />
                        }
                        on='click'
                        position='top center'
                      />
                      </div>
                    </Table.Cell>
                    </Table.Row>
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
