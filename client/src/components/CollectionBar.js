import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import DeleteCollection from "./modals/DeleteCollection";

const CollectionBar = ({id}) => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    return (
        <div>
            <Button variant="secondary" onClick={() => {}}>
                Edit
            </Button>
            <Button variant="danger" onClick={() => setDeleteVisible(true)}>
                Delete
            </Button>
            <DeleteCollection
                show={deleteVisible}
                onHide={ () => setDeleteVisible(false)}
                id={id}
            />
        </div>
    );
};

export default CollectionBar;