import React from 'react';
import {Table, Container} from "react-bootstrap";
import User from "./User";
import UserBar from "./UserBar";

const UserList = ({users, title}) => {

    return (
        <div>
            <h1>{title}</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Activated</th>
                    <th>Ban</th>
                    <th>Created date</th>
                    <th>Roles</th>
                    <th>Toolbar</th>
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