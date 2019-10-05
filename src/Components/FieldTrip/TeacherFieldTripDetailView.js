import React from "react";
import { useGlobal } from "reactn";
import {
  Button,
  Checkbox,
  Form,
  Header,
  Icon,
  Message,
  Modal,
  Segment,
  Table,
} from "semantic-ui-react";
import AddChaperoneModal from './AddChaperoneModal';
import { MaybeCheckmarkWithWarning } from '../Shared/MaybeCheckmark';
import getStatus from '../../Utils/getStatus';

const TeacherFieldTripDetailView = (
  { setStudentInfo,
    setChaperones,
    setChaperonesToAssign,
    chaperonesToAssign,
    studentInfo,
    students,
    totalCount,
    parentList,
    setIsSuccessfullyAdded,
    isSuccessfullyAdded,
    setError,
    error,
    _handleSubmit,
    _handleChange,
    chaperones,
    trip,
    onHandleCheckbox,
    match,
  }) => {
  const [ user ] = useGlobal("user");

  return (
    <>
      {
        user.role === "teacher" && (
          <>
            <Segment basic clearing style={{ padding: "unset", marginTop: 120 }}>
              <Header as='h2' floated='left'>Students</Header>
              <Modal
                trigger={
                  <Button floated="right" primary>
                    <Icon name="add" />
                    Add Student
                  </Button>
                }
                closeIcon
                onClose={() => {
                  setStudentInfo({
                    first_name: "",
                    last_name: "",
                  });
                  setIsSuccessfullyAdded(false);
                  setError(false);
                }}
              >
                <Modal.Header className="modalHeader">Add Student</Modal.Header>
                <Modal.Content>
                  {
                    isSuccessfullyAdded && (
                      <Message positive>
                        <Message.Header>Student successfully added!</Message.Header>
                      </Message>
                    )
                  }

                  {
                    Object.keys(error).length > 0 && (
                      <Message negative>
                        <Message.Header>
                          We ran into an issue adding the student. {error.message}. Please try again.
                        </Message.Header>
                      </Message>
                    )
                  }
                  <Form onSubmit={_handleSubmit}>
                    <Form.Group widths="equal">
                      <Form.Input
                        fluid
                        label="First Name"
                        name="first_name"
                        value={studentInfo.first_name}
                        onChange={_handleChange}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Input
                        fluid
                        label="Last Name"
                        name="last_name"
                        value={studentInfo.last_name}
                        onChange={_handleChange}
                      />
                    </Form.Group>
                    <Form.Field
                      control='select'
                      name='parent_id'
                      label='Parent Name'
                      placeholder='Parent'
                      onChange={_handleChange}
                    >
                      <option
                        value="default"
                      >
                        Select a Parent
                      </option>
                        {parentList.map(parent => <option key={parent.id} value={parent.id}>
                        {`${parent.last_name}, ${parent.first_name}`}
                      </option>)}
                    </Form.Field>
                    <Form.Button primary>Submit</Form.Button>
                  </Form>
                </Modal.Content>
              </Modal>
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
                          <Checkbox checked={student.paid_status}
                                    onClick={(e, data) => onHandleCheckbox({
                                      studentStatusID: student.id,
                                      paid_status: data.checked,
                                    })}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox checked={student.permission_status}
                                    onClick={(e, data) => onHandleCheckbox({
                                      studentStatusID: student.id,
                                      permission_status: data.checked,
                                    })}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox checked={student.supplies_status}
                                    onClick={(e, data) => onHandleCheckbox({
                                      studentStatusID: student.id,
                                      supplies_status: data.checked,
                                    })}
                          />
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
                  <Table.HeaderCell>{/*students.length*/} {totalCount} Students Going</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Footer>
            </Table>

            <AddChaperoneModal
              error={error}
              setError={setError}
              isSuccessfullyAdded={isSuccessfullyAdded}
              setIsSuccessfullyAdded={setIsSuccessfullyAdded}
              setChaperones={setChaperones}
              chaperones={chaperones}
              setChaperonesToAssign={setChaperonesToAssign}
              chaperonesToAssign={chaperonesToAssign}
              trip={trip}
              match={match}
              user={user}
            />
          </>
        )
      }
    </>
  );
}

export default TeacherFieldTripDetailView;
