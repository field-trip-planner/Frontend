import React, {useState, useEffect } from 'react'
import api from "../../api/index.js"
import { useGlobal } from 'reactn'
import { Modal, Button, Container } from "semantic-ui-react"
import ParentRegistrationModal from '../ParentRegistrationModal/index.js'

const ParentalSchoolLookUpModal = () => {
    const [school, setSchool] = useGlobal("school")
    const [schools, setSchools] = useState([])

    useEffect(() => {
        api()
        .get("schools")
        .then(({ data }) => {
            setSchools(data)
            console.log("SCHOOL LIST DATA ", data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const _handleChange = e => {
        e.preventDefault()
        setSchool(e.target.value)
        console.log("SCHOOL SET FOR PARENT", e.target.value)
    
    }

    return(
        <>
        <Modal size="large" trigger={<Button>Sign Up </Button>}> 
            <Modal.Header>School Look Up</Modal.Header>
            <Modal.Content>
                <Container fluid>
                    <select name="school_id" id="" onChange={_handleChange}>
                        <option value="default">Choose your school</option>
                        {schools.map(school => {
                        return (
                            <option key={school.id} value={school.id}>
                            {school.school_name}
                            </option>
                        );
                        })}
                    </select>
                    <ParentRegistrationModal />
                </Container>
            </Modal.Content>
        </Modal>
        </>
    )
}

export default ParentalSchoolLookUpModal