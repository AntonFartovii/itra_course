import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Container, Button, Form, Badge} from "react-bootstrap";
import {fetchOneItem} from "../http/itemAPI";
import CommentsList from "../components/CommentsList";
import {createComment, fetchComments} from "../http/commentAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {createLike, fetchLikes} from "../http/likeAPI";

const ItemPage = observer (() => {
    const {user} = useContext(Context)
    const [item, setItem] = useState({info: []})
    const [value, setValue] = useState('')
    const [addedComment, setAddedComment] = useState(false)
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState(0)
    const [isLike, setIsLike] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        fetchOneItem(id).then(data => {
            setItem(data)
            const count = data.likes ? data.likes.length : 0
            setLikes(data.likes.length)
            const like = data.likes.find(like => like.userId === user.user.id)
            like ? setIsLike(true) : setIsLike(false)
        })
    },[])

    useEffect(() => {
        fetchComments(null, id, 100).then( data => {
            setComments(data)
            setAddedComment(false)
        })
    }, [addedComment])

    const addComment = () => {
        if (value) {
            createComment({value, userId: user.user.id, itemId: item.id}).then( comment => {
                setComments ([...comments, comment])
                setAddedComment(true)
                setValue('')
            })
        } else {
            alert('Введите текст')
        }
    }

    const addLike = () => {
        const userId = user.user.id
        const itemId = item.id
        createLike({userId, itemId}).then( data => {
            if ( data.length === 0 ) {
                setLikes(likes - 1)
                setIsLike(false)
            } else {
                setLikes(likes + 1)
                setIsLike(true)
            }
        })
    }

    return (
        <Container>
            <h3>
                <Badge bg="secondary">ID: {item.id}</Badge>{item.name}
            </h3>
            <Button variant="primary" onClick={addLike} className="mb-3">
                Likes <Badge bg="secondary">{likes}</Badge>
            </Button>
            {
                isLike ? 'Вы поставили лайк' : 'Вы не поставили лайк'
            }
            <CommentsList comments={comments} key={item.id}/>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Comment form</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Enter comment text"}
                    />
                    <Form.Text className="text-muted">
                        Enter comment text
                    </Form.Text>
                </Form.Group>

                <Button onClick={addComment}>Add comment</Button>
            </Form>
        </Container>
    );
});

export default ItemPage;