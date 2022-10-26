import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import DeleteItem from "./modals/DeleteItem";
import EditItem from "./modals/EditItem";
import { FormattedMessage } from 'react-intl'

const ItemBar = ({id}) => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)

    return (
        <div>
            <Button className="ml-2 mx-2" variant="secondary" onClick={() => setEditVisible(true)}>
                <FormattedMessage id='button.edit' />
            </Button>
            <Button className="ml-2 mx-2" variant="danger" onClick={() => setDeleteVisible(true)}>
                <FormattedMessage id='button.delete' />
            </Button>

            <DeleteItem
                show={deleteVisible}
                onHide={ () => setDeleteVisible(false)}
                id={id}
            />
            <EditItem
                show={editVisible}
                onHide={ () => setEditVisible(false)}
                id={id}
            />
        </div>
    );
};

export default ItemBar;