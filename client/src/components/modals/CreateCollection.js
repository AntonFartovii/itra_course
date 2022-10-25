import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createCollection} from "../../http/collectionAPI";
import {Context} from "../../index";
import CollectionForm from "../forms/CollectionForm";

const CreateCollection = ({show, onHide, userId}) => {

    const [collection, setCollection] = useState({
        name: '', theme: '', description: ''
    })

    const addCollection = () => {
        createCollection({...collection, userId}).then( data => {
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
                    Add Collection
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <CollectionForm collection={collection} setCollection={setCollection}/>
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