import React, {useContext, useEffect, useState} from 'react';
import {Card, Spinner} from "react-bootstrap";
import {fetchTags} from "../http/tagAPI";
import {Context} from "../index";
import TagList from "./TagList";


const TagCloud = () => {
    const {tag} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTags(100).then(data => {
            tag.setTags( data )
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) return <Spinner animation={"grow"}/>;

    return (
        <Card className="mb-4">
            <Card.Header>
                <h3>Облако тегов</h3>
            </Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                   <TagList tags={tag.tags}/>
            </Card.Body>
        </Card>
    );
};

export default TagCloud;