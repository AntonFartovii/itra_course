import React, {useContext, useState} from 'react';
import Collection from "./Collection";
import {Alert, Button, Table} from "react-bootstrap";
import CreateCollection from "./modals/CreateCollection";
import {Context} from "../index";
import { FormattedMessage } from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

const CollectionList = ({ collections, title = 'Collections list', userId}) => {
    const [addVisible, setAddVisible] = useState(false)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    console.log( window.location.pathname )
    return (
        <div>
            <h2>{title}</h2>
            {
                user.isAuth &&
                    <Button
                        className="mb-2"
                        variant="primary"
                        onClick={() => setAddVisible(true)}
                    >
                        <FormattedMessage id='button.create.collection' />
                    </Button>
            }

            <CreateCollection
                userId={userId}
                show={addVisible}
                onHide={() => setAddVisible(false)}
            />

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>№</th>
                    <th><FormattedMessage id='app.table.name' /></th>
                    <th><FormattedMessage id='app.table.author' /></th>
                    <th><FormattedMessage id='app.table.items.count' /></th>
                    {
                        window.location.pathname !== '/'
                        && <th><FormattedMessage id='app.table.toolbar' /></th>
                    }

                </tr>
                </thead>
                <tbody>
                    {  !collections.length
                        ?   <tr>
                                <td colSpan="6">
                                    <Alert key="info" variant="info">
                                        <FormattedMessage id='collections.not.found' />
                                    </Alert>
                                </td>
                            </tr>
                        :   collections.map( (collection, index) =>
                                <Collection
                                    index={index + 1}
                                    collection={collection}
                                    key={collection.id}
                                    id={collection.id}
                                />
                            )
                    }
                </tbody>
            </Table>

        </div>
    );
};

export default CollectionList;