import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {deleteUser} from "../../http/userAPI";
import {deleteItem} from "../../http/itemAPI";
import {Context} from "../../index";

const DeleteItem = ({show, onHide, id}) => {
    const {item} = useContext(Context)
    const click = () => {
        deleteItem( id ).then( data => {
            item.setRefresh(true)
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
                    Are you sure to delete item id {id}?
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
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteItem;