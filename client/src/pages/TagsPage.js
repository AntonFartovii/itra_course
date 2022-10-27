import React, {useContext, useEffect, useState} from 'react';
import {fetchTags} from "../http/tagAPI";
import {Context} from "../index";
import {Container, Badge, Button, Card} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import CreateTag from "../components/modals/CreateTag";
import {observer} from "mobx-react-lite";
import {TAG_ROUTE, USER_ROUTE} from "../constants/consts";
import {useNavigate} from 'react-router-dom'
import TagCloud from "../components/TagCloud";

const TagsPage = observer(() => {
    const [addVisible, setAddVisible] = useState(false)




    return (
        <Container>
                <Button
                    className="mb-3"
                    variant="outline-primary"
                    onClick={() => setAddVisible(true)}
                >
                    <FormattedMessage id='button.add' />
                </Button>

                <CreateTag
                    show={addVisible}
                    onHide={ () => setAddVisible(false)}
                />

                <TagCloud/>

        </Container>
    );
});

export default TagsPage;