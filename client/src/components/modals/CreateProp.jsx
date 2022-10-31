import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createProp} from "../../http/propAPI";
import props from "../../constants/props";

const CreateProp = ({show, onHide, collectionId}) => {
    const {collection} = useContext(Context)

    const [name, setName] = useState('')
    const [type, setType] = useState(props[0].type)

    const click = () => {
        createProp({name, type, collectionId}).then( data => {
            setName('')
            console.log( data )
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
                    <Form.Select
                        style={{width:'130px'}}
                        onChange={e => setType(e.target.value)}
                        defaultValue={type}
                    >
                        {
                            !props
                            ? ''
                                : props.map( prop =>
                                    <option value={prop.type} key={prop.id}>{prop.type}</option>
                                )
                        }

                    </Form.Select>

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