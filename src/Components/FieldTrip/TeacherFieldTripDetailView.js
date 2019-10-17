import React, { useState } from "react";
import { useGlobal } from "reactn";
import {
  Button,
  Checkbox,
  Form,
  Header,
  Icon,
  Input,
  Message,
  Modal,
  Pagination,
  Popup,
  Segment,
  Table,
} from 'semantic-ui-react'
import AddChaperoneModal from './AddChaperoneModal';
import { MaybeCheckmarkWithWarning } from '../Shared/MaybeCheckmark';
import getStatus from '../../Utils/getStatus';

const EmptyView = ({children}) => {
  return (
    <Table.Row>
      <Table.Cell textAlign="center" colSpan="7">
        <div style={{padding: 20, fontSize: 16}}>
          {children}
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

const TeacherFieldTripDetailView = (
  { setStudentInfo,
    setChaperones,
    setChaperonesToAssign,
    chaperonesToAssign,
    studentInfo,
    students,
    statusIncompleteCount,
    totalCount,
    totalPages,
    activePage,
    setActivePage,
    handleSort,
    onKeyDownSearchChange,
    query,
    onSearchClear,
    sortBy,
    direction,
    onPaginationChange,
    onDeleteMessageConfirmation,
    lastAddedStudentStatusID,
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
  const isOrAre = statusIncompleteCount > 1 ? 'are' : 'is';

  const getEmptyView = () => {
    if (!students.length) {
      if (query) {
        return (
          <EmptyView>
            Sorry, no students were found!
          </EmptyView>
        )
      }
      return (
        <EmptyView>
          So far, no attendees.
        </EmptyView>
      )
    }
  }

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

            <Segment
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              size="big"
              attached="top"
            >
              <Header
                as='h3'
                content={`${totalCount} Total`}
                subheader={!query && `${statusIncompleteCount} ${isOrAre} incomplete`}
                style={{marginBottom: 0}}
              />
              <Input
                icon={{ name: 'search' }}
                iconPosition='left'
                action={
                  <Button onClick={onSearchClear}
                          icon='cancel'
                  />
                }
                placeholder='Search a student...'
                size="mini"
                value={query}
                onChange={onKeyDownSearchChange}
              />
            </Segment>

            <Table style={{marginBottom: 50}}
                   celled
                   striped
                   selectable={students.length > 0}
                   attached="bottom"
                   sortable
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={sortBy === 'first_name' ? direction : null}
                    onClick={handleSort('first_name', activePage)}
                  >
                    First Name
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={sortBy === 'last_name' ? direction : null}
                    onClick={handleSort('last_name', activePage)}
                  >
                    Last Name
                  </Table.HeaderCell>
                  <Table.HeaderCell collapsing>
                    <div style={{ width: 70 }}>
                      Paid
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell singleLine collapsing>
                    <div style={{ width: 70 }}>
                      E-sign
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell collapsing>
                    <div style={{ width: 70 }}>
                      Supplies
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    collapsing
                    sorted={sortBy === 'going_status' ? direction : null}
                    onClick={handleSort('going_status', activePage)}
                  >
                    Status
                  </Table.HeaderCell>
                  <Table.HeaderCell collapsing >Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                { getEmptyView() }
                {
                  students.map((student) => {
                    const status = getStatus(student);
                    const isComplete = status === 'complete';

                    return (
                      <Table.Row
                        key={student.id}
                        style={
                          lastAddedStudentStatusID === student.id ?
                            {backgroundColor: '#ebf5ff'} : undefined
                        }
                      >
                        <Table.Cell>{student.first_name}</Table.Cell>
                        <Table.Cell>{student.last_name}</Table.Cell>
                        <Table.Cell selectable>
                          <div style={{cursor: 'pointer', padding: 11}}>
                            <Checkbox checked={student.paid_status}
                                      onClick={(e, data) => onHandleCheckbox({
                                        studentStatusID: student.id,
                                        paid_status: data.checked,
                                      })}
                            />
                          </div>
                        </Table.Cell>
                        <Table.Cell selectable>
                          <div style={{cursor: 'pointer', padding: 11}}>
                            <Checkbox checked={student.permission_status}
                                      onClick={(e, data) => onHandleCheckbox({
                                        studentStatusID: student.id,
                                        permission_status: data.checked,
                                      })}
                            />
                          </div>
                        </Table.Cell>
                        <Table.Cell selectable>
                          <div style={{cursor: 'pointer', padding: 11}}>
                            <Checkbox checked={student.supplies_status}
                                      onClick={(e, data) => onHandleCheckbox({
                                        studentStatusID: student.id,
                                        supplies_status: data.checked,
                                      })}
                            />
                          </div>
                        </Table.Cell>
                        <Table.Cell negative={!isComplete} positive={isComplete}>
                          <div style={{display: 'flex', alignItems: 'center', width: 95}}>
                            <MaybeCheckmarkWithWarning isComplete={isComplete} />
                            <span>
                                {status}
                              </span>
                          </div>
                        </Table.Cell>
                        <Popup
                          trigger={
                            <Table.Cell
                              collapsing
                              selectable
                              textAlign="center"
                            >
                              <div style={{cursor: 'pointer'}}>
                                <Icon name="trash alternate outline" />
                              </div>
                            </Table.Cell>
                          }
                          content={
                            <Button color='red'
                                    content='Really delete?'
                                    onClick={() =>{
                                      onDeleteMessageConfirmation(student.id, activePage);
                                    }}
                            />
                          }
                          on='click'
                          position='top center'
                        />
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='7'>
                    <Pagination
                      floated='right'
                      boundaryRange={0}
                      activePage={activePage}
                      onPageChange={(e, data) => {
                        onPaginationChange(data.activePage);
                        setActivePage(data.activePage);
                      }}
                      firstItem={null}
                      lastItem={null}
                      siblingRange={1}
                      totalPages={totalPages}
                      size='mini'
                    />
                  </Table.HeaderCell>
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
