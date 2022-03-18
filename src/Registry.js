import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AppNav from './AppNav';
import { Modal } from 'react-bootstrap';

class Registry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            items: [{
                id: "1",
                name: "Rice",
                description: "Box of white or brown rice",
                numPerFamily: 2,
                needed: 10,
                committed: 5
              },
              {
                id: "2",
                name: "Beans",
                description: "8oz can of beans",
                numPerFamily: 4,
                needed: 12,
                committed: 6
              },
              {
                id: "3",
                name: "Mac N Cheese",
                description: "Small box of macaroni and cheese",
                numPerFamily: 3,
                needed: 12,
                committed: 6
              }],
            headers: ["Name", "Description", "# Needed", "Your Commitment"],
            userInfo: {
                firstName: "John",
                lastName: "Smith",
                email: "jsmith@email.com"
            },
            commitments: []
        };
    }

    findCommitmentByItemId = (commitments, itemId) => {
        return commitments.find(commitment => commitment.itemId == itemId)
    }

    findItemById = (items, itemId) => {
        return items.find(item => item.id == itemId)
    }

    handleCommitmentChange = (event) => {
        const target = event.target;
        const value = target.value;
        const itemId = target.id;
        let commitments = this.state.commitments
        const newCommitment = {itemId: itemId, committed: value}
        const index = commitments.findIndex(item => item.itemId === itemId)
        if (index >= 0) {
            commitments[index] = newCommitment
        } else {
            commitments.push(newCommitment)
        }

        this.setState({commitments});
    }

    handleUserInfoChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let userInfo = this.state.userInfo
        userInfo[name] = value 
        this.setState({userInfo});
    }

    clearForm = () => {
        let userInfo =  {
            firstName: "",
            lastName: "",
            email: ""
        }
        let commitments = this.state.commitments
        commitments.length = 0
        console.log(commitments)
        this.setState({userInfo, commitments})
    }

    render() {
        const {isLoading, items, commitments, headers, userInfo} = this.state;
        console.log(commitments)
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const itemsList = items.map(item => {
            if (item.id !== null) {
                return (
                    <tr >
                        <td>
                            <p>{item.name}</p>
                        </td>
                        <td>
                            <p>{item.description}</p>  
                        </td>
                        <td>
                            <p>
                                {item.needed - item.committed}
                            </p>
                        </td>
                        <td>
                            <Form.Group className="mb-2">
                                <Form.Control type="text" id={item.id} 
                                    value={this.findCommitmentByItemId(commitments, item.id)?.committed}
                                    onChange={this.handleCommitmentChange}
                                />
                            </Form.Group>
                        </td>
                    </tr>);
            }
        });

        return (
            <div>
                <AppNav />
                <Container>
                    <Form>
                        <h1>Registry</h1>
                        <h3 className="sub-header" >Your Information</h3>
                            <Row>
                                <Form.Group as={Col} xs lg="3" className="mb-3" controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={userInfo.firstName} onChange={this.handleUserInfoChange} name="firstName" />
                                </Form.Group>
                                <Form.Group as={Col} xs lg="3" className="mb-3" controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={userInfo.lastName} onChange={this.handleUserInfoChange} name="lastName" />
                                </Form.Group>
                                <Form.Group as={Col} xs lg="4" className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={userInfo.email} onChange={this.handleUserInfoChange} name="email"/>
                                </Form.Group>
                            </Row>
                        <h3 className="sub-header" >Items</h3>
                        <Table>
                            <thead>
                                <tr>
                                    {headers.map(header => (
                                        <th>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {itemsList}
                            </tbody>
                        </Table>
                        <Button className="form-button" variant="primary" type="submit">
                            Submit
                        </Button>
                        <CancelButton />
                    </Form>
                </Container>
            </div>
        );
    }
}

function CancelButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCancel = () => {
        handleClose()
    }

    return (
        <>
        <Button className="form-button" variant="outline-danger" onClick={handleShow}>
            Cancel
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Cancel Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to cancel?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={handleCancel}>
                Yes, cancel
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default Registry;