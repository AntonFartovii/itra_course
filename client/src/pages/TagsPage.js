import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Container, Badge, Button, Card} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import CreateTag from "../components/modals/CreateTag";
import {observer} from "mobx-react-lite";
import TagCloud from "../components/TagCloud";

const TagsPage = observer(() => {
    const {user} = useContext(Context)
    const [addVisible, setAddVisible] = useState(false)


    return (
        <div>
            {
                user.isAuth &&
                <Button
                    className="mb-3"
                    variant="outline-primary"
                    onClick={() => setAddVisible(true)}
                >
                    <FormattedMessage id='button.add' />
                </Button>
            }

                <CreateTag
                    show={addVisible}
                    onHide={ () => setAddVisible(false)}
                />

                <TagCloud/>

        </div>
    );
});

export default TagsPage;