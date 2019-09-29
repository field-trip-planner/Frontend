import React, { useState } from "react";
import Fuse from "fuse.js";
import {
  Button,
  Card,
  Header,
  Icon,
  Input,
  Message,
  Modal,
  Segment
} from "semantic-ui-react";
import api from "../../api";

const options = {
  shouldSort: true,
  threshold: 0.5,
  location:4,
  distance: 10,
  maxPatternLength: 12,
  minMatchCharLength: 1,
  keys: [
    "last_name",
    "first_name"
  ]
};

const AddChaperoneModal = (
  {
    chaperones,
    setChaperones,
    error,
    isSuccessfullyAdded,
    setIsSuccessfullyAdded,
    setError,
    trip,
  }) => {

  const fuse = new Fuse(chaperones, options);
  const [searchVal, searchChaperones] = useState('');
  let chaperonesFound = searchVal ? fuse.search(searchVal) : chaperones;

  const _handleSearch = e => {
    const{name, value} = e.target;
    searchChaperones(value);
    console.log('>>>>> chaperonesFound ', chaperonesFound);
    // console.log('====>> NOW assignedChap', assignedChap);
  };

  const _handleAddChap = (e)  => {
    let addedChaperone = {
      user_id: chaperonesFound[0].id,
      field_trip_id: trip.id
    }

    api
      .post (`chaperones/`, addedChaperone )
      .then(({data}) => {
        console.log('++++++ chaperonesFound[0]', chaperonesFound[0]);
        let newChaperoneList = chaperones.filter(item => item.id !== chaperonesFound[0].id);
        return setChaperones(newChaperoneList);

      })
      .catch(err => err);

    setIsSuccessfullyAdded(true);
    setError(false);
  }

  const ChaperoneCard = ({ chaperone }) => {
    const {
      id,
      first_name,
      last_name,
    } = chaperone;

    return (
      <Card.Content>
        <Icon.Group size='large'>
          <Icon loading size='large' name='circle notch' />
          <Icon name='user' />
        </Icon.Group>
        <Button key = {id} color = 'blue' onClick = {_handleAddChap}>
          {last_name}  {first_name}
        </Button>
      </Card.Content>
    )
  }

  return (
    <Segment basic clearing style={{ padding: "unset", marginTop: 80 }}>
      <Header as='h2' floated='left'>Chaperones</Header>
      <Modal
        trigger={
          <Button floated="right" primary>
            <Icon name="add" />
            Add Chaperone
          </Button>
        }
        closeIcon
      >
        <Modal.Header className="modalHeader">Add Chaperone!</Modal.Header>
        <Modal.Content>
          {
            isSuccessfullyAdded && (
              <Message positive>
                <Message.Header>Chaperone added!</Message.Header>
              </Message>
            )

          }

          {
            Object.keys(error).length > 0 && (
              <Message negative>
                <Message.Header>
                  Error adding the chaperone. {error.message}.
                </Message.Header>
              </Message>
            )
          }
          <Card.Group itemsPerRow = {2} textAlign = 'right'>
            <Card>
              <Input
                onChange={_handleSearch}
                size="large"
                icon="search"
                iconPosition="left"
                placeholder="...search"
                floated="left"
                value={searchVal}
              />
            </Card>
            { chaperonesFound
              ?
              <Card centered >
                {chaperonesFound.map(chap => (
                  <ChaperoneCard key = {chap.id}  chaperone = {chap}/>
                ))}
              </Card>
              :
              null
            }
          </Card.Group>
        </Modal.Content>
      </Modal>
    </Segment>
  )
};

export default AddChaperoneModal;
