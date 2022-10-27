import React from 'react';
import {Badge, Card} from "react-bootstrap";
import {TAG_ROUTE} from "../constants/consts";
import {useNavigate} from "react-router-dom";

const TagList = ({tags}) => {
    const navigate = useNavigate()

    return (
        <div>
            {
                !tags
                    ? ''
                    : tags.map( tag =>
                        <Badge link
                               onClick={() => navigate(TAG_ROUTE + '/' + tag.id)}
                               className="mx-3"
                               pill
                               bg="warning"
                               key={tag.id}
                               text="dark"
                        >
                            {tag.name}
                        </Badge>
                    )
            }
        </div>
    );
};

export default TagList;