import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import DeleteUser from "./modals/DeleteUser";
import BanUser from "./modals/BanUser";
import AdminUser from "./modals/AdminUser";
import UserBar from "./UserBar";
import UserList from "./UserList";

const User = (props) => {
    return (
            <tr>
                <td>{props.index || 'not data'}</td>
                <td>{props.item.name || 'not data'}</td>
                <td>{props.item.email || 'not data'}</td>
                <td>{props.item.isActivated ? 'yes' : 'no'}</td>
                <td>{props.item.banned ? 'yes' : 'no'}</td>
                <td></td>
                <td>{props.item.role}</td>
                <td>
                   <UserBar
                       id={props.item.id}
                   />
                </td>
            </tr>
    );
};

export default User;