import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import DeleteCollection from "./modals/DeleteCollection";
import EditCollection from "./modals/EditCollection";
import CreateItem from "./modals/CreateItem";
import CreateProp from "./modals/CreateProp";

const CollectionBar = ({id, collection, setCollection}) => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [addVisible, setAddVisible] = useState(false)
    const [propVisible, setPropVisible] = useState(false)

    return (
        <div>
            <Button className="mx-2" variant="outline-secondary" onClick={() => setEditVisible(true)}>
                Edit
            </Button>

            <Button className="mx-2" variant="outline-danger" onClick={() => setDeleteVisible(true)}>
                Delete
            </Button>
            <Button className="mx-2" variant="outline-primary" onClick={() => setAddVisible(true)}>
                Create item
            </Button>
            <Button className="mx-2" variant="outline-success" onClick={() => setPropVisible(true)}>
                Add prop
            </Button>

            <EditCollection
                collection={collection}
                setCollection={setCollection}
                show={editVisible}
                onHide={ () => setEditVisible(false)}
                id={id}
                data={collection}
            />

            <DeleteCollection
                show={deleteVisible}
                onHide={ () => setDeleteVisible(false)}
                id={id}
            />
            <CreateItem
                collectionId={id}
                show={addVisible}
                onHide={ () => setAddVisible(false)}
                userId={collection.userId}
            />
            <CreateProp
                collectionId={id}
                show={propVisible}
                onHide={ () => setPropVisible(false)}
                userId={collection.userId}
            />
        </div>
    );
};

export default CollectionBar;