import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../index";
import {Container, Alert, Card, Button, Spinner} from "react-bootstrap";
import ItemList from "../components/ItemList";
import {useParams} from 'react-router-dom'
import {fetchOneCollection} from "../http/collectionAPI";
import {fetchItems} from "../http/itemAPI";
import ItemFilter from "../components/ItemFilter";
import {useItems} from "../components/hooks/useItems";
import CollectionBar from "../components/CollectionBar";
import {observer} from "mobx-react-lite";
import Markdown from "react-remarkable";
import props from "../constants/props";

const CollectionPage = observer(() => {
    const {user} = useContext(Context)

    const [selectedSort, setSelectedSort] = useState('')
    const [collection, setCollection] = useState({})
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        fetchOneCollection(id).then(data => {
            setCollection(data)
        })
    }, [])

    useEffect( () => {
        fetchItems(null, id).then( data => {
            setItems(data.rows)
        }).finally(() => setIsLoading(false))
    }, [])

    let obj = {}
    collection.props && collection.props.forEach( prop => {
        obj[prop.type] = obj[prop.type] ? obj[prop.type] + 1 : 1
    })

    const sortItems = (event) => {
        const sort = event.target.value
        setSelectedSort(sort)
        console.log( event.target.value )
        setItems([...items].sort( (a, b) => a[sort].localeCompare(b[sort])))

    }


    return (
        <Container>
            {
                (user.user.id === collection.userId || user.isAdmin)
                && <CollectionBar
                    id={id}
                    collection={collection}
                    setCollection={setCollection}
                />
            }

            <Card className="mb-2 mt-2">
                <Card.Header>
                    <Card.Title>{collection.name}</Card.Title>
                    <Card.Subtitle>{collection.theme}</Card.Subtitle>
                </Card.Header>
                <Card.Img
                    variant="top"
                    src={process.env.REACT_APP_API_URL + '/' + collection.img}
                />
                <Card.Body>
                    <Card.Title>Description (Markdown):</Card.Title>
                    <Markdown source={collection.description} />
                </Card.Body>
            </Card>

            <Card className="mb-2">
                <Card.Header>
                    <Card.Title>
                        Collection properties
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Вы можете создать:
                    </Card.Title>
                        {
                            props &&
                                props.map( prop =>
                                <h5 key={prop.id}>{prop.type} {prop.limit - (obj[prop.type] || 0)}/{prop.limit}</h5>
                                )
                        }
                </Card.Body>
                <Card.Footer>
                    <Card.Title>Добавленные свойства:</Card.Title>
                    {
                        !collection.props
                            ?  <Card.Subtitle>В коллекции нет созданных свойств</Card.Subtitle>
                            :   collection.props.map( prop =>
                                <Button key={prop.id} className="mx-3" variant="info">{prop.name} ({prop.type})</Button>
                            )
                    }
                </Card.Footer>
            </Card>

            <div>
                <select
                    value={selectedSort}
                    onChange={sortItems}>
                    <option disabled value=""></option>
                    <option key={"sort_name"} value="name">По названию</option>
                    <option key={"sort_id"} value="createdAt">По дата создания</option>
                </select>
            </div>

            {
                isLoading
                ?   <Spinner animation="border" size="sm" />
                :   <ItemList key={collection.id} items={items}></ItemList>
            }
        </Container>
    );
});

export default CollectionPage;