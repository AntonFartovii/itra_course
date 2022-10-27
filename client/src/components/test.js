import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../index";
import {Container, Alert, Card, Button, Spinner} from "react-bootstrap";
import ItemList from "../components/ItemList";
import {useParams} from 'react-router-dom'
import {fetchOneCollection} from "../http/collectionAPI";
import {fetchItems} from "../http/itemAPI";
import ItemFilter from "../components/ItemFilter";
import CollectionBar from "../components/CollectionBar";
import {observer} from "mobx-react-lite";
import Markdown from "react-remarkable";
import {useFetching} from "./hooks/useFetching";
import {useItems} from "./hooks/useItems";


const Test = observer(() => {
    const {user} = useContext(Context)
    const {collection} = useContext(Context)

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const [props, setProps] = useState([])
    const {id} = useParams()

    const [fetchData, isItemsLoading, itemError] = useFetching(async () => {
        const data = await fetchItems(null, id)
        setItems(data.rows)
    })

    useEffect(() => {
        fetchOneCollection(id).then(data => {
            collection.setCollection(data)
            setProps(data.props)
            collection.setRefresh(false)
        })
    }, [collection.refresh])

    useEffect( () => {
        fetchData()
    }, [filter])

    const sortedAndSearchedItems = useItems(items, filter.sort, filter.query)

    return (
        <Container>
            <ItemFilter filter={filter} setFilter={setFilter}></ItemFilter>
            <hr style={{margin: '15px 0'}}/>
            <CollectionBar
                id={id}
                collection={collection.collection}
                setCollection={collection.setCollection}
            />

            <Card className="mb-2 mt-2">
                <Card.Header><h3>{collection.collection.name}</h3></Card.Header>
                <Card.Body>
                    <Card.Title>Markdown to html description:</Card.Title>
                    <Card.Text>
                        <Markdown source={collection.collection.description} />
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="mb-2">
                <Card.Header><h5>Collection properties</h5></Card.Header>
                <Card.Body>
                    <Card.Text>
                        {
                            props && props.map( prop =>
                                <Button className="mx-3" variant="info">{prop.name}</Button>
                            )
                        }
                    </Card.Text>
                </Card.Body>
            </Card>

            {
                itemError && <h1>Произошла ошибка</h1>
            }
            {
                isItemsLoading
                    ?    <Spinner animation="border" size="sm" />
                    :   <ItemList items={sortedAndSearchedItems}></ItemList>
            }
        </Container>
    );
});

export default Test;