import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../index";
import {Container, Button, Row, Col, Form, FloatingLabel} from "react-bootstrap";
import ItemList from "../components/ItemList";
import {useParams} from 'react-router-dom'
import {fetchOneCollection} from "../http/collectionAPI";
import {fetchItems} from "../http/itemAPI";
import CreateItem from "../components/modals/CreateItem";
import ItemFilter from "../components/ItemFilter";
import {useItems} from "../components/hooks/useItems";
import {useFetching} from "../components/hooks/useFetching";

const CollectionPage = () => {
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const [addVisible, setAddVisible] = useState()
    const [collection, setCollection] = useState({})
    const {id} = useParams()

    const [fetchData, isItemsLoading, itemError] = useFetching(async () => {
        const data = await fetchItems(null, id)
        setItems(data.rows)
    })

    useEffect(() => {
        fetchOneCollection(id).then(data => setCollection(data))
    }, [])

    useEffect( () => {

        fetchData()
    }, [filter])


    const sortedAndSearchedItems = useItems(items, filter.sort, filter.query)

    return (
        <Container>
            <hr style={{margin: '15px 0'}}/>

            <Button variant="primary" onClick={() => setAddVisible(true)}>
                Create item
            </Button>

            <h1>{id}. {collection.name}</h1>
            <ItemFilter filter={filter} setFilter={setFilter}></ItemFilter>
            {
                itemError && <h1>Произошла ошибка</h1>
            }
            {
                isItemsLoading
                ?   <h2>Loading...</h2>
                :   <ItemList items={sortedAndSearchedItems}></ItemList>
            }



            <CreateItem
                collectionId={id}
                show={addVisible}
                onHide={ () => setAddVisible(false)}
                userId={id}
            />
        </Container>
    );
};

export default CollectionPage;