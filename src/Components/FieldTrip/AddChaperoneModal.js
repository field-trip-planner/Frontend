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
  location: 4,
  distance: 10,
  maxPatternLength: 12,
  minMatchCharLength: 1,
  keys: ["last_name", "first_name"]
};

const AddChaperoneModal = ({
  setChaperones,
  error,
  isSuccessfullyAdded,
  setIsSuccessfullyAdded,
  setError,
  trip,
  user,
  match
}) => {
  const [chaperonesToAssign, setChaperonesToAssign] = useState([]);
  const tripItemID = match.params.id;

  // Fuzzy search
  const fuse = new Fuse(chaperonesToAssign, options);
  const [searchVal, searchChaperones] = useState("");
  let chaperonesFound = searchVal ? fuse.search(searchVal) : chaperonesToAssign;

  const _handleSearch = e => {
    const { name, value } = e.target;
    searchChaperones(value);
  };

  const _handleAddChap = (e, { id }) => {
    console.log("data prop target::", id);

    // the id is how we know which chaperone is selected from the list
    //  same id passed as a prop in the <Card.Content> button below
    const addedChaperone = {
      user_id: id,
      field_trip_id: trip.id
    };

    api()
      .post(`chaperones/`, addedChaperone)
      .then(({ data }) => {
        api()
          .get(`/chaperones/${tripItemID}`)
          .then(res => setChaperones(res.data))
          .catch(err => console.log(err));

        const newChaperoneList = chaperonesToAssign.filter(
          chaperone => chaperone.id !== id
        );
        return setChaperonesToAssign(newChaperoneList);
      })
      .catch(err => err);

    setIsSuccessfullyAdded(true);
    setError(false);
    setTimeout(() => {
      setIsSuccessfullyAdded(false);
    }, 1500);
  };

  const ChaperoneCard = ({ chaperone }) => {
    const { id, first_name, last_name } = chaperone;

    return (
      <Card.Content>
        <Icon.Group size="large">
          <Icon name="add user"
            style={{
              color: "#fff",
              backgroundColor: "#757575",
              marginRight: 20,
            }}
            circular
          />
        </Icon.Group>
        <Button key={id} id={id} onClick={_handleAddChap}>
          {last_name}, {first_name}
        </Button>
      </Card.Content>
    );
  };

  return (
    <Segment basic clearing style={{ padding: "unset", marginTop: 80 }}>
      <Header as="h2" floated="left">
        Chaperones
      </Header>
      <Modal
        onOpen={() => {
          api()
            .get(`users/chaperones/${tripItemID}/${user.school_id}`)
            .then(({ data }) => {
              return setChaperonesToAssign(data);
            })
            .catch(err => err);
        }}
        trigger={
          <Button floated="right">
            <Icon name="add" />
            Add Chaperone
          </Button>
        }
        closeIcon
      >
        <Modal.Header className="modalHeader">Add a Chaperone</Modal.Header>
        <Modal.Content>
          {isSuccessfullyAdded && (
            <Message positive>
              <Message.Header>Chaperone added!</Message.Header>
            </Message>
          )}

          {Object.keys(error).length > 0 && (
            <Message negative>
              <Message.Header>
                Error adding the chaperone. {error.message}.
              </Message.Header>
            </Message>
          )}
          <Card.Group itemsPerRow={2} textAlign="right">
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
            {chaperonesFound ? (
              <Card centered>
                {chaperonesFound.map(chap => (
                  <ChaperoneCard key={chap.id} chaperone={chap} />
                ))}
              </Card>
            ) : null}
          </Card.Group>
        </Modal.Content>
      </Modal>
    </Segment>
  );
};

export default AddChaperoneModal;
