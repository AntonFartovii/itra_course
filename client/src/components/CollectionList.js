import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Collection from "./Collection";

const CollectionList = observer(({title}) => {
    const {collection} = useContext(Context)
    title = title || 'Collections list'
    return (
        <div>
            <h1>{title}</h1>
            {
                collection.collections.map( (collection, index) =>
                    <Collection
                        index={index + 1}
                        collection={collection}
                        key={collection.id}
                        id={collection.id}
                    />
                )
            }
        </div>
    );
});

export default CollectionList;