import React from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const CollectionForm = observer(({collection, setCollection}) => {



    const setName = (e) => {
        collection.name = e.target.value
    }
    const setTheme = (e) => {
        collection.theme = e.target.value
    }

    const setDescription = (e) => {
        collection.description = e.target.value
    }

    return (
        <Form>
            <Form.Label>Enter name</Form.Label>
            <Form.Control
                value={collection.name}
                onChange={setName}
            />
            <Form.Label>Enter theme</Form.Label>
            <Form.Control
                value={collection.theme}
                onChange={setTheme}
            />
            <Form.Label>Enter description</Form.Label>
            <Form.Control
                as="textarea"
                value={collection.description}
                onChange={setDescription}
            />
        </Form>
    );
});

export default CollectionForm;