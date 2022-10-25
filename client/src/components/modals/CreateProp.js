import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createProp} from "../../http/propAPI";

const CreateProp = ({show, onHide, collectionId}) => {
    const [name, setName] = useState('')
    const {collection} = useContext(Context)

    const click = () => {
        createProp({name, collectionId}).then( data => {
            setName('')
            onHide()
            collection.setRefresh(true)
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add prop to collection ID: {collectionId}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Enter name"}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                >
                    Close
                </Button>
                <Button
                    variant="outline-success"
                    onClick={click}
                >
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProp;