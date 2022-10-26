import React from 'react';
import Comment from "./Comment";
import {Alert} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

const CommentsList = ({comments = []}) => {

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
        </div>
    );
};

export default CommentsList;