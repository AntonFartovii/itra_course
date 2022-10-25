import React, {useContext, useState} from 'react';
import {Button, Row, Col} from "react-bootstrap";
import DeleteCollection from "./modals/DeleteCollection";
import NavLink from 'react-bootstrap/NavLink';
import {COLLECTION_PAGE_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom'
import CollectionBar from "./CollectionBar";
import {Context} from "../index";

const Collection = ( props ) => {
    const {user} = useContext(Context)
    const id = props.collection.id
    const navigate = useNavigate()

    return (

                <tr>
                    <td>
                        {props.index}
                    </td>
                    <td>
                        <NavLink onClick={()=> navigate(COLLECTION_PAGE_ROUTE + '/' + id, { replace: true })}>
                            {props.collection.name}
                        </NavLink>
                    </td>
                    <td>
                        {props.collection.count}
                    </td>
                    <td>
                        {
                            user.isAdmin || user.user.id === id
                            ? <CollectionBar id={id} collection={props.collection}/>
                            : <h4>Admin-only access</h4>
                        }

                    </td>
                </tr>
    );
};

export default Collection;