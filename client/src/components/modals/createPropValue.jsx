import React, {useRef, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createPropValue} from "../../http/propAPI";

const CreatePropValue = ({show, onHide, itemId, create, prop = {}}) => {

    const init = prop.values[0] && prop.values[0][prop.type] || ''
    const [value, setValue] = useState(prop.values[0] && prop.values[0][prop.type])

    const changeBox = (e) => {
            setValue(value => !value)
            console.log('value: ', value)
    }

    const click = () => {

        if( itemId && prop.id && prop.type) {
            createPropValue(
                {itemId, propId: prop.id, type: prop.type, value}
                ).then( data => {
                    create([data])
                onHide()
            })
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Укажите значение свойства {prop.name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {
                        prop &&
                        (prop.type === 'textarea') &&
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    }
                    {
                        (prop.type === 'checkbox') &&
                        <Form.Check
                            type="checkbox"
                            value={value}
                            onChange={changeBox}
                        />
                    }
                    {
                        (prop.type === 'string') &&
                        <Form.Control
                            as="input"
                            rows={3}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    }
                    {

                        (prop.type === 'date') &&
                        <Form.Control
                            type="date"
                            value={value}
                            rows={3}
                            onChange={e => setValue(e.target.value)}
                        />
                    }
                    {

                        (prop.type === 'integer') &&
                        <Form.Control
                            value={value}
                            type="number"
                            rows={3}
                            onChange={e => setValue(e.target.value)}
                        />
                    }

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={ () => {
                        onHide()
                        setValue(prop.values[0] && prop.values[0][prop.type])
                    }}
                >
                    Close
                </Button>
                <Button
                    variant="outline-success"
                    onClick={click}
                >
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );

};

export default CreatePropValue;