import React from 'react';
import UserBar from "./UserBar";
import NavLink from "react-bootstrap/NavLink";
import {ADMIN_ROUTE} from "../constants/consts";
import {useNavigate} from 'react-router-dom'

const User = (props) => {
    const navigate = useNavigate()

    return (
            <tr>
                <td>{props.index || 'not data'}</td>
                <td>{props.item.id}</td>
                <td>
                    <NavLink className="mb-2" onClick={()=> navigate(ADMIN_ROUTE + '/user/' + props.item.id, { replace: true })}>
                        {props.item.name}
                    </NavLink>
                </td>
                <td>
                    <NavLink onClick={()=> navigate(ADMIN_ROUTE + '/user/' + props.item.id, { replace: true })}>
                        {props.item.email}
                    </NavLink>
                </td>
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