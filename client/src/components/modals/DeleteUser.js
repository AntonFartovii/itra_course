import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {deleteCollection} from "../../http/collectionAPI";
import {Context} from "../../index";
import {deleteUser} from "../../http/userAPI";

const DeleteUser = ({show, onHide, id}) => {

    const removeUser = () => {
        deleteUser( id ).then( data => {
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
                    Are you sure?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

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
                    onClick={removeUser}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUser;