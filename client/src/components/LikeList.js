import React, {useContext, useState} from 'react';
import {Badge, Button, Container} from "react-bootstrap";
import {createLike} from "../http/likeAPI";
import {Context} from "../index";

const LikeList = ({itemId, item}) => {
    const {user} = useContext(Context)

    const [likes, setLikes] = useState(item.likes.length)
    const [isLike, setIsLike] = useState(() => {

    })
    //
    // if ( item.likes ) {
    //     const like = item.likes.find( like => like.userId === user.user.id )
    //     like ? setIsLike(true) : setIsLike(false)
    // }



    const addLike = () => {
        const userId = user.user.id
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
        <div>
            <h3>
                {item.name}
            </h3>
            <Button
                variant="primary"
                onClick={addLike}
                className="mb-3">
                    Likes
                    <Badge bg="secondary">{likes}</Badge>
            </Button>
            {/*{*/}
            {/*    isLike ? 'Вы поставили лайк' : 'Вы не поставили лайк'*/}
            {/*}*/}
        </div>
    );
};

export default LikeList;