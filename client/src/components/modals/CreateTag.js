import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createTag} from "../../http/tagAPI";

const CreateTag = ({show, onHide}) => {
    const [name, setName] = useState('')
    const {tag} = useContext(Context)

    const click = () => {
        createTag({name}).then( data => {
            tag.setTags([...tag.tags, data])
            onHide()
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
                    Add tag
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
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTag;