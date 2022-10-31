import React, {useContext, useEffect, useState} from 'react';
import {Form, Table, Accordion, Button} from "react-bootstrap";
import {fetchProps} from "../http/propAPI";
import Prop from "../Prop";
import CreatePropValue from "./modals/createPropValue";
import {Context} from "../index";

const PropsList = ({collectionId, itemId, user}) => {

    const [loading, setLoading] = useState(true)
    const [collectionProps, setCollectionProps] = useState([])

    useEffect( () => {
        fetchProps(collectionId, itemId).then( data => {
            setCollectionProps(data)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    // console.log(collectionProps)

    return (
        <Accordion className="mb-3" defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Свойства элемента</Accordion.Header>
                <Accordion.Body>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Значение</th>
                            {   user.isAuth &&
                                <th></th>
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            collectionProps &&
                                collectionProps.map( prop =>
                                    <Prop
                                        key={'prop_' + prop.id}
                                        data={prop}
                                        itemId={itemId}
                                    />
                                )
                        }
                        </tbody>
                    </Table>


                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    );
};

export default PropsList;