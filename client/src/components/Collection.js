import React, {useContext} from 'react';
import NavLink from 'react-bootstrap/NavLink';
import {COLLECTION_PAGE_ROUTE} from "../constants/consts";
import {useNavigate} from 'react-router-dom'
import CollectionBar from "./CollectionBar";
import {Context} from "../index";
import ItemBar from "./ItemBar";

const Collection = ( props ) => {
    const {user} = useContext(Context)
    const id = props.collection.id
    const author = props.collection.user.email

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
                        {props.collection.user && props.collection.user.email}
                    </td>
                    <td>
                        {props.collection.count}
                    </td>
                    {
                        window.location.pathname !== '/'
                        && <td>
                            {
                                user.isAdmin || user.user.id === id
                                    ? <CollectionBar id={id} collection={props.collection}/>
                                    : <h4>Admin-only access</h4>
                            }

                        </td>
                    }

                </tr>
    );
};

export default Collection;