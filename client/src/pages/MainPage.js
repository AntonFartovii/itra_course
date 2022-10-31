import React, {useContext, useEffect, useState} from 'react';
import {Container, Spinner} from "react-bootstrap";
import ItemList from "../components/ItemList";

import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchItems} from "../http/itemAPI";
import CollectionList from "../components/CollectionList";
import {fetchCollections} from "../http/collectionAPI";
import { FormattedMessage } from 'react-intl'
import TagCloud from "../components/TagCloud";

const Main = observer(() => {
    const {user} = useContext(Context)
    const {item} = useContext(Context)

    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        fetchItems(null,null,10, 'createdAt').then( data => {
            item.setItems(data.rows)
            item.setRefresh(false)
        })
    },[item.refresh])

    useEffect( () => {
        fetchCollections(null,5).then( data => {
            setCollections(data.rows)
        }).finally(() => setLoading(false))
    }, [user.auth])

    if (loading) return <Spinner animation={"grow"}/>;

    return (
        <div>
            <TagCloud/>
            <ItemList
                items = {item.items}
                title={<FormattedMessage id='app.main.list.items' />}
            />

            <CollectionList
                collections = {collections}
                setCollections = {setCollections}
                title={<FormattedMessage id='app.main.list.collections' />}
                userId={user.user.id}
            />
        </div>
    );
});

export default Main;