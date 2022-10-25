import React, {useContext} from 'react';
import ItemBar from "./ItemBar";
import NavLink from "react-bootstrap/NavLink";
import {ITEM_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom'
import {Context} from "../index";

const Item = ( props ) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
                <tr>
                    <td>{props.index || 'not data'}</td>
                    <td>{props.item.createdAt}</td>
                    <td>
                        <NavLink onClick={()=> navigate(ITEM_ROUTE + '/' + props.item.id, { replace: true })}>
                            {props.item.name}
                        </NavLink>
                        </td>
                    <td>
                        {props.item.collection ? props.item.collection.name : 'not data'}
                    </td>
                    <td>
                        {props.item.user ? props.item.user.email : 'not data'}
                    </td>
                    <td>
                        {user.isAdmin && <ItemBar id={props.item.id}/>}
                    </td>
                </tr>
    );
};

export default Item;