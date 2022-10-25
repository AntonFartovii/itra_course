import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {switchAdminRole} from "../../http/userAPI";
import {Context} from "../../index";

const AdminUser = ({show, onHide, id}) => {
    const {user} = useContext(Context)

    const click = () => {
        switchAdminRole( id ).then( data => {
            if ( user.user.id === data.id ) {
                data.role === 'ADMIN'
                    ? user.setIsAdmin(true)
                    : user.setIsAdmin(false)
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
                    onClick={click}
                >
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminUser;