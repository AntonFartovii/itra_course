import React, {useContext} from 'react';
import Item from "./Item";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Table} from "react-bootstrap";

const ItemList = observer(({items,title}) => {
    // const {item} = useContext(Context)
    if ( !items.length ) {
        return (
            <h1>Items not found</h1>
        )
    }
    return (
        <div>
            <h1>{title}</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Collection name</th>
                        <th>Author</th>
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