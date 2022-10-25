import React from 'react';
import Item from "./Item";
import {observer} from "mobx-react-lite";
import {Table} from "react-bootstrap";

const ItemList = observer(({items = [],title}) => {


    return (
            !items.length
            ? <h1>Items not found</h1>
            : <div>
                    <h1>{title}</h1>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>CreatedAt</th>
                            <th>Name</th>
                            <th>Collection name</th>
                            <th>Author</th>
                            <th>Toolbar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items.map( (item, index) =>
                                <Item item={item} index={index + 1} key={item.id}/>
                            )
                        }
                        </tbody>
                    </Table>
                </div>
    );
});

export default ItemList;