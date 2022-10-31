import React, {useState} from 'react';
import {editCollection} from "../../http/collectionAPI";
import Modal from "react-bootstrap/Modal";
import CollectionForm from "../forms/CollectionForm";
import {Button} from "react-bootstrap";
import {editItem} from "../../http/itemAPI";

const EditItem = ({show, onHide, id, item, setItem}) => {

    const click = () => {

        editItem().then( data => {
            onHide()
        })
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/*<ItemForm item={item} setItem={setItem}/>*/}
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
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditItem;