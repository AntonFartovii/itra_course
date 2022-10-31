import React, {useContext, useState} from 'react';
import NavLink from 'react-bootstrap/NavLink';
import {COLLECTION_PAGE_ROUTE} from "../constants/consts";
import {useNavigate} from 'react-router-dom'
import CollectionBar from "./CollectionBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Collection = observer(( props ) => {
    const {user} = useContext(Context)
    const {index} = props
    let [collection, setCollection] = useState({...props.collection})
    const id = collection.id

    const navigate = useNavigate()

    // console.log( new Proxy(collection, {}))

    return (
                <tr>
                    <td>
                        {index}
                    </td>
                    <td>
                        <NavLink onClick={()=> navigate(COLLECTION_PAGE_ROUTE + '/' + id, { replace: true })}>
                            {collection.name}
                        </NavLink>
                    </td>
                    <td>
                        {   collection.user
                                ? collection.user.email
                                : collection.userId
                        }
                    </td>
                    <td>
                        {collection.count}
                    </td>
                    {
                        window.location.pathname !== '/'
                        && <td>
                            {
                                (user.isAdmin || user.user.id === collection.userId)
                                    ? <CollectionBar
                                        id={id}
                                        collection={collection}
                                        setCollection={setCollection}
                                      />
                                    : <h4>Admin-only access</h4>
                            }
                            </td>
                    }

                </tr>
    );
});

export default Collection;