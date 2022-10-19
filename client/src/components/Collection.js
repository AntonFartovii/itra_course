import React, {useState} from 'react';
import {Button, Row, Col} from "react-bootstrap";
import DeleteCollection from "./modals/DeleteCollection";
import NavLink from 'react-bootstrap/NavLink';
import {COLLECTION_PAGE_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom'

const Collection = ( props ) => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const navigate = useNavigate()

    return (
        <Row>
            <Col>
                <NavLink onClick={()=> navigate(COLLECTION_PAGE_ROUTE + '/' + props.collection.id, { replace: true })}>
                    <h1>{props.index}. {props.collection.name}</h1>
                    ID: {props.collection.id}
                </NavLink>

            </Col>
            <Col>
                <Button variant="secondary" onClick={() => {}}>
                    Edit
                </Button>
                <Button variant="danger" onClick={() => setDeleteVisible(true)}>
                    Delete
                </Button>
            </Col>
            <DeleteCollection
                show={deleteVisible}
                onHide={ () => setDeleteVisible(false)}
                id={props.collection.id}
            />
        </Row>
    );
};

export default Collection;