import React from 'react';
import {FloatingLabel, Form} from 'react-bootstrap'

const ItemFilter = ({filter, setFilter}) => {
    return (
        <div>
            <input
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <FloatingLabel controlId="floatingSelect" label="Sorting">
                <Form.Select
                    value={filter.sort}
                    aria-label="Select option please"
                    onChange={e => setFilter({...filter, sort: e.target.value})}
                >
                    <option>Open this select menu</option>
                    <option value="name">По названию</option>
                </Form.Select>
            </FloatingLabel>
        </div>
    );
};

export default ItemFilter;