import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Comment = ({comment}) => {

        return (
            <Card className="mb-3">
                <Card.Header>
                    {comment.createdAt}:&nbsp;
                    Author: id {comment.userId}.
                    {comment.user ? comment.user.email : 'No data'}
                </Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        {comment.value}
                    </Card.Text>
                    {/*<Button variant="primary">Go somewhere</Button>*/}
                </Card.Body>
            </Card>
        );
};

export default Comment;