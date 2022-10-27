import React, {useContext, useEffect} from 'react';
import {Card} from "react-bootstrap";
import {fetchTags} from "../http/tagAPI";
import {Context} from "../index";
import TagList from "./TagList";


const TagCloud = () => {
    const {tag} = useContext(Context)


    useEffect(() => {
        fetchTags(100). then(data => {
            tag.setTags( data )
            console.log( data )
        })
    }, [])

    return (
        <Card className="mb-4">
            <Card.Header>
                <h3>Облако тегов</h3>
            </Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                   <TagList tags={tag.tags}/>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TagCloud;