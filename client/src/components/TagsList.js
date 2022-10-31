import React, {useEffect, useMemo, useState} from 'react';
import {itemAddTag} from "../http/itemAPI";
import Card from "react-bootstrap/Card";
import {Button, Form, Toast, ListGroup} from "react-bootstrap";
import TagList from "./TagList";
import {fetchTags} from "../http/tagAPI";

const TagsList = ({itemId, user, item, create}) => {

    const [tags, setTags] = useState([])
    const [tagName, setTagName] = useState('')
    const [showB, setShowB] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const toggleShowB = () => setShowB(!showB);

    const switchTag = (itemId, tagName) => {
            itemAddTag( itemId, tagName ).then(data => {
                create(data)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        fetchTags().then( data => {
            setTags( data )
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    const searchedTags = useMemo( () => {
        return tags.filter( tag => tag.name.includes( tagName ) )
    }, [tagName])

    const inputTag = (e) => {
        setTagName(e.target.value)
    }

    return (
        <Card className="mb-3">
            <Card.Header>
                <Form>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        value={tagName}
                        onChange={inputTag}
                        onFocus={toggleShowB}
                        placeholder={"Enter tag"}
                    />
                    {
                        user.isAuth &&
                        <Button
                            className="mt-2"
                            onClick={() => switchTag(itemId, tagName)}
                            variant="primary"
                        >
                            Add tag
                        </Button>
                    }

                    <Toast onClose={toggleShowB} show={showB} animation={false}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Тэги:</strong>
                            <small></small>
                        </Toast.Header>
                        <Toast.Body>
                            <ListGroup variant="flush">
                                {
                                    searchedTags &&
                                    searchedTags.map(tag =>
                                        <ListGroup.Item
                                            action
                                            key={tag.id}
                                            value={tag.name}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setTagName(e.target.value)
                                            }}
                                        >
                                            {tag.name}
                                        </ListGroup.Item>

                                    )
                                }
                            </ListGroup>
                        </Toast.Body>
                    </Toast>
                </Form>
            </Card.Header>
            <Card.Body>
                <TagList tags={item.tags} itemId={itemId} remove={switchTag}/>
            </Card.Body>
        </Card>
    );
};

export default TagsList;