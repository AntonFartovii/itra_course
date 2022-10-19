import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createCollection} from "../../http/collectionAPI";
import {Context} from "../../index";
import {createItem} from "../../http/itemAPI";

const CreateItem = ({show, onHide, collectionId}) => {
    const [value, setValue] = useState('')
    const {item} = useContext(Context)

    const add = () => {
        createItem({name: value, collectionId}).then( data => {
            setValue('')
            onHide()
            item.setRefresh(true)
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
                    Add item
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
                    onClick={add}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateItem;