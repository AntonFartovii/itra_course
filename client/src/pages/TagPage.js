import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {fetchTag, fetchTagByName} from "../http/tagAPI";
import {Context} from "../index";
import {Container, Card} from "react-bootstrap";
import ItemList from "../components/ItemList";

const TagPage = () => {
    const {tag} = useContext(Context)
    const {id} = useParams()

    const [items, setItems] = useState([])
    useEffect(() => {
        fetchTag( id ).then(data => {
            setItems( data.items )
            console.log( data )
        })
    }, [])

    return (
        <Container>
            <Card>
                <Card.Header>
                    <h3>Элементы с тэгом {tag.tag.name}</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {
                            !items
                            ? ''
                            : <ItemList items={items}/>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>

        </Container>
    );
};

export default TagPage;