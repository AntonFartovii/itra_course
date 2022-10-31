import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {deleteCollection} from "../../http/collectionAPI";
import {Context} from "../../index";
import {useNavigate} from 'react-router-dom';
import {MAIN_ROUTE} from "../../constants/consts";

const DeleteCollection = ({show, onHide, id}) => {
    const {collection} = useContext(Context)
    const navigate = useNavigate()

    const removeCollection = () => {
        deleteCollection(id ).then( data => {
            onHide()
            navigate(MAIN_ROUTE)
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
                    Are you shure
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
                    onClick={removeCollection}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCollection;