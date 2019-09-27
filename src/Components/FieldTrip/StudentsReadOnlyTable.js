import React from "react";
import { useGlobal } from "reactn";
import {
  Checkbox,
  Header,
  Icon,
  Message,
  Modal,
  Segment,
  Table,
} from "semantic-ui-react";

const StudentsReadOnlyTable = (
  { setStudentInfo,
    studentInfo,
    trip,
    students,
    getStatus,
    setIsSuccessfullyAdded,
    isSuccessfullyAdded,
    setError,
    error,
  }) => {
  const [ user ] = useGlobal("user");

  return (
    <>
      {
        user.role === "parent" || user.role === "chaperone" && (
          <>
            <Segment basic clearing style={{ padding: "unset", marginTop: 120}} >
              <Header as='h2' floated='left'>Attending Students</Header>
            </Segment>

            <Table columns={5} style={{ marginTop: 20, marginBottom: 50 }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Paid</Table.HeaderCell>
                  <Table.HeaderCell>E-sign</Table.HeaderCell>
                  <Table.HeaderCell>Supplies</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  students.map((student) => {
                    return (
                      <Table.Row key={student.id}>
                        <Table.Cell>{student.first_name}</Table.Cell>
                        <Table.Cell>{student.last_name}</Table.Cell>
                        <Table.Cell>
                          <Checkbox readOnly checked={student.paid_status} />
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox readOnly checked={student.permission_status} />
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox readOnly checked={student.supplies_status} />
                        </Table.Cell>
                        <Table.Cell>
                          {getStatus(student.id)}
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell>{students.length} Students Going</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Footer>
            </Table>

          </>

        )
      }
    </>
  );
}

export default StudentsReadOnlyTable;
