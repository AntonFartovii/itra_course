import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createCollection} from "../../http/collectionAPI";
import {Context} from "../../index";
import CollectionForm from "../forms/CollectionForm";

const CreateCollection = ({create, show, onHide, userId}) => {

    const [form, setForm] = useState({
        name: '',
        theme: '',
        description: '',
        file: {}
    })


    const addCollection = () => {
        createCollection({...form, userId}).then( data => {
            create(data)
            setForm({ name: '',
                theme: '',
                description: '',
                file: {}})
            onHide()
        })
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Collection
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <CollectionForm form={form} setForm={setForm}/>
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