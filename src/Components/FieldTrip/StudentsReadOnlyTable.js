import React from "react";
import { useGlobal } from "reactn";
import {
  Checkbox,
  Header,
  Icon,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";
import {MaybeCheckmark, MaybeCheckmarkWithWarning} from '../Shared/MaybeCheckmark';
import getStatus from '../../Utils/getStatus'

const StudentsReadOnlyTable = (
  { setStudentInfo,
    studentInfo,
    trip,
    students,
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
              <Header as='h2' floated='left'>Students</Header>
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
                    const selectedStudent = students.find(s => {
                      return s.id === student.id;
                    });
                    const status = getStatus(selectedStudent);
                    const isComplete = status === 'complete';
                    return (
                      <Table.Row key={student.id}>
                        <Table.Cell>{student.first_name}</Table.Cell>
                        <Table.Cell>{student.last_name}</Table.Cell>
                        <Table.Cell>
                          <MaybeCheckmark isComplete={student.paid_status} />
                        </Table.Cell>
                        <Table.Cell>
                          <MaybeCheckmark isComplete={student.permission_status} />
                        </Table.Cell>
                        <Table.Cell>
                          <MaybeCheckmark isComplete={student.supplies_status} />
                        </Table.Cell>
                        <Table.Cell negative={!isComplete} positive={isComplete}>
                          <div style={{display: 'flex', alignItems: 'center', width: 95}}>
                            <MaybeCheckmarkWithWarning isComplete={isComplete} />
                            <span>
                              {status}
                            </span>
                          </div>
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
