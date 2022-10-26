import React from 'react';
import Item from "./Item";
import {observer} from "mobx-react-lite";
import {Table, Alert} from "react-bootstrap";
import { FormattedMessage } from 'react-intl'

const ItemList = observer(({items = [],title}) => {


    return (

            <div>
                    <h2>{title}</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th><FormattedMessage id='app.table.created' /></th>
                            <th><FormattedMessage id='app.table.name' /></th>
                            <th><FormattedMessage id='app.table.collection.name' /></th>
                            <th><FormattedMessage id='app.table.author' /></th>
                            <th><FormattedMessage id='app.table.toolbar' /></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !items.length
                                ?   <tr>
                                        <td colSpan="6">
                                            <Alert key="info" variant="info">
                                                <FormattedMessage id='items.not.found' />
                                            </Alert>
                                        </td>
                                    </tr>
                                :   items.map( (item, index) =>
                                        <Item item={item} index={index + 1} key={item.id}/>
                                    )
                        }
                        </tbody>
                    </Table>
                </div>
    );
});

export default ItemList;