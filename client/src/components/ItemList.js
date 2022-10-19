import React, {useContext} from 'react';
import Item from "./Item";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const ItemList = observer(({title}) => {
    const {item} = useContext(Context)
    title = title || 'Items list'
    return (
        <div>
            <h1>{title}</h1>
            {
                item.items.map( item =>
                    <Item item={item} key={item.id}/>
                )
            }
        </div>
    );
});

export default ItemList;