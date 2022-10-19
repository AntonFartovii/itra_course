import React from 'react';

const Item = ( props ) => {
    // console.log( props)
    return (
        <div>
            <h1>{props.item.id}. {props.item.name}</h1>
        </div>
    );
};

export default Item;