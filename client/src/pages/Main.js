import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import ItemList from "../components/ItemList";

import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchItems} from "../http/itemAPI";
import CollectionList from "../components/CollectionList";
import {fetchCollections} from "../http/collectionAPI";

const Main = observer(() => {
    const {user} = useContext(Context)
    const {item} = useContext(Context)
    const {collection} = useContext(Context)

    useEffect( () => {
        fetchItems(null,null,5).then( data => {
            item.setItems(data.rows)
        })
    },[])

    useEffect( () => {
        fetchCollections(null,5).then( data => {
            collection.setCollections(data.rows)
            collection.setTotalCount(data.count)
        })
    }, [])

    return (
        <Container>

            <ItemList title="List items 1"/>
            <CollectionList title="Collection list"/>
        </Container>
    );
});

export default Main;