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
        fetchItems(null,null,10, 'createdAt').then( data => {
            item.setItems(data.rows)
        })
    },[])

    useEffect( () => {
        fetchCollections(null,5).then( data => {
            collection.setCollections(data.rows)
            collection.setTotalCount(data.count)
        })
    }, [user.auth])

    return (
        <Container>
            <ItemList items = {item.items} title="List last items"/>
            <CollectionList collections = {collection.collections} title="Biggest collection list"/>
        </Container>
    );
});

export default Main;