import React, {useContext, useEffect, useState} from 'react';
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
    const [selectedSort, setSelectedSort] = useState('')
    const [addVisible, setAddVisible] = useState()
    const [collection, setCollection] = useState({})
    const {item} = useContext(Context)
    const {id} = useParams()


    useEffect(() => {
        fetchOneCollection(id).then(data => setCollection(data))
    }, [])

    useEffect(() => {
        fetchItems(null, id, 10).then(data =>
            item.setItems(data.rows)
        )
    }, [])

    const sortItems = (sort) => {
        console.log( sort )
    }

    return (
        <Container>
            <hr style={{margin: '15px 0'}}/>

            <FloatingLabel controlId="floatingSelect" label="Sorting">
                <Form.Select
                    value={selectedSort}
                    aria-label="Select option please"
                    onChange={sortItems}
                >
                    <option>Open this select menu</option>
                    <option value="name">По названию</option>
                </Form.Select>
            </FloatingLabel>

            <Button
                variant="primary"
                onClick={() => setAddVisible(true)}
            >
                Create item
            </Button>

            <h1>{id}. {collection.name}</h1>

            <ItemList item={item}></ItemList>

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