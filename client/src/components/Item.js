import React from 'react';
import {Row, Col} from "react-bootstrap";

const Item = ( props ) => {
    console.log( props)
    return (
                <tr>
                    <td>{props.index || 'not data'}</td>
                    <td>{props.item.name || 'not data'}</td>
                    <td>
                        {/*{props.item.collection.name ? props.item.collection.name : 'not data'}*/}
                    </td>
                    <td>
                        {/*{props.item.user.email ? props.item.user.email : 'not data'}*/}
                    </td>
                </tr>
    );
};

export default Item;