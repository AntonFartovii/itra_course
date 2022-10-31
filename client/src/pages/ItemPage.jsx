import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Container, Button, Form, Badge, Spinner} from "react-bootstrap";
import {fetchOneItem} from "../http/itemAPI";
import CommentsList from "../components/CommentsList";
import {Context} from "../index";
import PropsList from "../components/PropsList";
import TagsList from "../components/TagsList";
import LikeList from "../components/LikeList";
import {observer} from "mobx-react-lite";

const ItemPage = observer(() => {
    const {item, user} = useContext(Context)

    const {id} = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
       fetchOneItem(id)
           .then(data => {
                item.setItem(data)
               console.log( data)
            })
           .finally(() => {
               setLoading(false)
           })
    },[])

    const createComment = (newComment) => {
        const comments = [...item.item.comments, newComment]
        item.setItem({...item.item, comments})
    }

    const addTag = (newTags) => {
        item.setItem({...item.item, tags: newTags})
    }

    if (loading) return <Spinner animation={"grow"}/>;

    return (
        <div>

            <LikeList
                user={user}
                itemId={id}
                item={item.item}
            />

            <TagsList
                user={user}
                key={'tag'+id}
                itemId={id}
                item={item.item}
                create={addTag}
            />

            <PropsList
                user={user}
                key={'prop'+id}
                collectionId={item.item.collectionId}
                itemId={id}
            />

            <CommentsList
                user={user}
                key={'comment'+id}
                userId={user.user.id}
                itemId={id}
                comments={item.item.comments}
                create={createComment}
            />

        </div>
    );
});

export default ItemPage;