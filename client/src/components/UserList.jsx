import React from 'react';
import {Table} from "react-bootstrap";
import User from "./User";
import { FormattedMessage } from 'react-intl'

const UserList = ({users, title}) => {

    return (
        <div>
            <h1>
                <FormattedMessage id='userlist.title' />
            </h1>
            <Table responsive="lg" striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>id</th>
                    <th><FormattedMessage id='app.table.name' /></th>
                    <th><FormattedMessage id='app.table.email' /></th>
                    <th><FormattedMessage id='app.table.activated' /></th>
                    <th><FormattedMessage id='app.table.ban' /></th>
                    <th><FormattedMessage id='app.table.created' /></th>
                    <th><FormattedMessage id='app.table.role' /></th>
                    <th><FormattedMessage id='app.table.toolbar' /></th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map( (item, index) =>
                        <User
                            item={item}
                            index={index + 1}
                            key={item.id}
                        />
                    )
                }
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;