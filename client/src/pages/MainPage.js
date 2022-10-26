import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import ItemList from "../components/ItemList";

import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchItems} from "../http/itemAPI";
import CollectionList from "../components/CollectionList";
import {fetchCollections} from "../http/collectionAPI";
import { FormattedMessage } from 'react-intl'

const Main = observer(() => {
    const {user} = useContext(Context)
    const {item} = useContext(Context)
    const {collection} = useContext(Context)

    useEffect( () => {
        fetchItems(null,null,10, 'createdAt').then( data => {
            item.setItems(data.rows)
            item.setRefresh(false)
        })
    },[item.refresh])

    useEffect( () => {
        fetchCollections(null,5).then( data => {
            collection.setCollections(data.rows)
            collection.setTotalCount(data.count)
        })
    }, [user.auth])

    return (
        <Container>

            <ItemList
                items = {item.items}
                title={<FormattedMessage id='app.main.list.items' />}
            />

            <CollectionList
                collections = {collection.collections}
                title={<FormattedMessage id='app.main.list.collections' />}
            />

        </Container>
    );
});

export default Main;