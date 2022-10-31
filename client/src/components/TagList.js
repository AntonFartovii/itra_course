import React from 'react';
import {Badge, Card, Button, ButtonGroup } from "react-bootstrap";
import {TAG_ROUTE} from "../constants/consts";
import {useNavigate} from "react-router-dom";

const TagList = ({tags, remove, itemId}) => {
    const navigate = useNavigate()

    return (
        <div>
            {
                !tags
                    ? ''
                    : tags.map( tag =>
                        <ButtonGroup
                            className="mb-2 mx-2"
                            key={tag.id}
                            aria-label="Basic example"
                        >
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => navigate(TAG_ROUTE + '/' + tag.id)}
                            >
                                {tag.name}
                            </Button>
                            <Button
                                size="sm"
                                id={tag.id}
                                onClick={() => {remove(itemId, tag.name)}}
                                variant="secondary"
                            >
                                X
                            </Button>
                        </ButtonGroup>
                    )
            }
        </div>
    );
};

export default TagList;