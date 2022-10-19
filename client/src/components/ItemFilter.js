import React from 'react';
import {Container, Button, Row, Col} from "react-bootstrap";
import {FloatingLabel, Form} from 'react-bootstrap'

const ItemFilter = ({filter, setFilter}) => {
    return (
        <div>
            <div>
                <FloatingLabel controlId="floatingSelect" label="Sorting">
                    <Form.Select
                        aria-label="Select option please"
                        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    >
                        <option>Open this select menu</option>
                        <option value="name">По названию</option>
                    </Form.Select>
                </FloatingLabel>
            </div>
        </div>
    );
};

export default ItemFilter;