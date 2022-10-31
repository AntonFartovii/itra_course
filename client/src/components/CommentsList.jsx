import React, {useContext, useState} from 'react';
import Comment from "./Comment";
import {Alert, Button, Form} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {createComment} from "../http/commentAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const CommentsList = observer(({comments = [], create, userId, itemId, user}) => {
    const [value, setValue] = useState('')

    const addComment = () => {
        if (value) {
            createComment({value, userId, itemId}).then( comment => {
                create(comment)
                setValue('')
            })
        } else {
            alert('Введите текст')
        }
    }

    return (
        <div>
            {   !comments.length
                ?   <Alert key="info" variant="info">
                        <FormattedMessage id='comments.not.found' />
                    </Alert>
                :   comments.map(comment =>
                        <Comment comment={comment} key={comment.id}/>
                    )
            }
            {
                user.isAuth &&
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
            }

        </div>
    );
});

export default CommentsList;