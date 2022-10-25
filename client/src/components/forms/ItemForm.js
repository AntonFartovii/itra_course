import React from 'react';
import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ItemForm = () => {
    const [item, setItem] = useState({name: '', description: ''})
    const [items, setItems] = useState([
        {id: 1, name: "Item"},
        {id: 2, name: "Item"},
        {id: 3, name: "Item"},
        {id: 4, name: "Item"},
    ])

    const addNewItem = (e) => {
        e.preventDefault()

        setItems([...items, {...item, id: Date.now()}])
        setItem({name: '', description: ''})
    }
    return (
        <Form>
        <Form.Control
            onChange={e => setItem({...item, name: e.target.value})}
            value={item.name}
            type="text"
            placeholder="Item name"
        />
        <Form.Control
            onChange={e => setItem({...item, description: e.target.value})}
            value={item.description}
            type="text"
            placeholder="Item desc"
        />
        <Button
            onClick={addNewItem}
        >
            Create item
        </Button>
    </Form>
    );
};

export default ItemForm;