import React from "react";
import { useGlobal } from "reactn";
import {
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react'

const ChaperonesTable = ({ chaperones }) => {
  const [ user ] = useGlobal("user");

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
                      <Table.Cell>
                        {`${chaperone.first_name}, ${chaperone.last_name}`}
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
