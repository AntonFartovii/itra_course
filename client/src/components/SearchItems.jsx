import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {fetchItems} from "../http/itemAPI";
import Item from "./Item";

const SearchItems = () => {
    const navigate = useNavigate()

    const [items, setItems] = useState([{name: 'adasd'},{name: 'asdasdasd'}])
    const [searchQuery, setSearchQuery] = useState('')

    // useEffect( () => {
    //     fetchItems(null, null ).then( data =>
    //         setItems(data.rows)
    //     )
    // }, [])

    const searchedItems  = useMemo( () => {
        return items.filter( item => item.name.includes( searchQuery ) )
    }, [searchQuery, items])

    return (
        <div>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
            {
                !searchedItems
                ? ''
                : searchedItems.map( (item, index) =>
                        <Item item={item} index={index + 1} key={item.id}/>
                )

            }
        </div>
    );
};

export default SearchItems;