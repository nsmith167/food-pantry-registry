import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AppNav from './AppNav';
import { CloseButton, Modal } from 'react-bootstrap';
import {v4 as uuid} from 'uuid';

class AdminListItems extends Component {

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
            headers: ["Name", "Description", "# Per Family", "Total Needed", "Total Committed"],
            delivery: {
                date: "03/22/2022",
                numFamilies: "4"
            }
        };
    }

    handleFamilyNumberChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let delivery = {...this.state.delivery}
        delivery[name] = value 
        let items = this.state.items;
        const newItems = items.map((item) => {item.needed = item.numPerFamily * value});
        this.setState({newItems, delivery});
    }

    handleNumPerFamilyChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const itemId = target.id;
        let items = this.state.items;
        const numFamilies = this.state.delivery.numFamilies
        const index = items.findIndex(item => item.id === itemId)
        let newItem = items[index]
        newItem.needed = numFamilies * value;
        newItem[name] = value;
        items[index] = newItem
        this.setState({items});
    }

    handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        const itemId = target.id;
        let items = this.state.items;
        const index = items.findIndex(item => item.id === itemId)
        let newItem = items[index]
        newItem[name] = value;
        items[index] = newItem
        this.setState({items})
    }

    handleDateChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let delivery = {...this.state.delivery};
        delivery[name] = value;
        this.setState({delivery})
    }

    handleDeleteItem = (id) => {
        let items = this.state.items;
        items = items.filter(item => item.id != id)
        this.setState({items})
    }

    handleAddNewItem = () => {
        let items = this.state.items
        items.push({
            id: uuid(),
            name: "",
            description: "",
            numPerFamily: "",
            needed: 0,
            committed: 0
        })
        this.setState({items})
    }

    render() {
        const {items, isLoading, headers, delivery} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const itemsList = items.map(item => {
            if (item.id !== null) {
                return (
                    <tr >
                        <td>
                            <Form.Group className="mb-2" >
                                <Form.Control type="text" value={item.name} name="name" id={item.id} onChange={this.handleChange} />
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group className="mb-2" >
                                <Form.Control as="textarea" value={item.description} name="description" id={item.id} onChange={this.handleChange} />
                            </Form.Group>    
                        </td>
                        <td>
                            <Form.Group className="mb-2">
                                <Form.Control type="text"  value={item.numPerFamily} name="numPerFamily" id={item.id} onChange={this.handleNumPerFamilyChange}/>
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group className="mb-2" controlId="formNumNeeded">
                                <Form.Control type="text" value={item.needed} readOnly/>
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group className="mb-2" controlId="formNumCommitted">
                                <Form.Control type="text" value={item.committed} readOnly/>
                            </Form.Group>
                        </td>
                        <td>
                            <DeleteButton id={item.id} onClick={this.handleDeleteItem} />
                        </td>
                    </tr>);
            }
        });

        return (
            <div>
                <AppNav />
                <Container>
                    <Form>
                        <h1>Manage Registry</h1>
                        <h3 className="sub-header" >Delivery Details</h3>
                            <Row>
                                <Form.Group as={Col} xs lg="2" className="mb-3" controlId="formDeliveryDate">
                                    <Form.Label>Delivery Date</Form.Label>
                                    <Form.Control type="text" value={delivery.date} name="date" onChange={this.handleDateChange}/>
                                </Form.Group>
                                <Form.Group as={Col} xs lg="2" className="mb-3" controlId="formNumFamilies">
                                    <Form.Label>Number of Families</Form.Label>
                                    <Form.Control type="text" value={delivery.numFamilies} name="numFamilies" onChange={this.handleFamilyNumberChange}/>
                                </Form.Group>
                            </Row>
                        <h3 className="sub-header" >Items</h3>
                        <Button className="new-button" variant="outline-success" onClick={this.handleAddNewItem}>
                            New Item
                        </Button>
                        <Table>
                            <thead>
                                <tr>
                                    {headers.map(header => (
                                        <th>{header}</th>
                                    ))}
                                </tr>
                                <tr>{/*Placeholder for delete button column*/}</tr>
                            </thead>
                            <tbody>
                                {itemsList}
                            </tbody>
                        </Table>
                        <Button className="form-button" variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button className="form-button" variant="outline-danger">
                            Cancel
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

function DeleteButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        handleClose()
        props.onClick(props.id)
    }

    return (
        <>
        <CloseButton onClick={handleShow} />

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                Yes, delete
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AdminListItems;