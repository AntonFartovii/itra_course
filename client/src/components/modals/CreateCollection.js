import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createCollection} from "../../http/collectionAPI";
import {Context} from "../../index";

const CreateCollection = ({show, onHide, userId}) => {
    const [value, setValue] = useState('')
    const {collection} = useContext(Context)

    const addCollection = () => {
        createCollection({name: value, userId}).then( data => {
            setValue('')
            onHide()
            collection.refresh = true
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
                    Add Collection
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
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
                    onClick={addCollection}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCollection;