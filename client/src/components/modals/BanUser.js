import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {banUser, deleteUser} from "../../http/userAPI";
import {Context} from "../../index";

const BanUser = ({show, onHide, id}) => {
    const {user} = useContext(Context)

    const click= () => {
        banUser( id ).then( data => {
            if ( user.user.id === data.id ) {
                user.setIsBan( data.banned )
            }
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
                    Ban
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BanUser;