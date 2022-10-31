import React from 'react';
import {FloatingLabel, Form} from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import {FormattedMessage} from "react-intl";
import Container from "react-bootstrap/Container";

const ItemFilter = ({filter, setFilter}) => {
    return (
        <div>
            <input
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    className="me-2"
                    aria-label="Search"
                    value={filter.query}
                    onChange={e => setFilter({...filter, query: e.target.value})}
                />
                {/*<Button variant="outline-success">*/}
                {/*    <FormattedMessage id='app.header.search' />*/}
                {/*</Button>*/}
            </Form>

            {/*<FloatingLabel controlId="floatingSelect" label="Sorting">*/}
            {/*    <Form.Select*/}
            {/*        value={filter.sort}*/}
            {/*        aria-label="Select option please"*/}
            {/*        onChange={e => setFilter({...filter, sort: e.target.value})}*/}
            {/*    >*/}
            {/*        <option>Open this select menu</option>*/}
            {/*        <option value="name">По названию</option>*/}
            {/*    </Form.Select>*/}
            {/*</FloatingLabel>*/}
        </div>
    );
};

export default ItemFilter;