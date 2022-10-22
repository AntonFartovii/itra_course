import React, {useContext, useEffect, useState} from 'react';
import {fetchCollections} from "../http/collectionAPI";
import {Button, Container} from "react-bootstrap";
import CollectionList from "./CollectionList";
import CreateCollection from "./modals/CreateCollection";
import {Context} from "../index";

const UserPageContent = ({author}) => {
    const [collectionVisible, setCollectionVisible] = useState(false)
    const {collection} = useContext(Context)

    console.log( author )
    useEffect( () => {
        fetchCollections(author.id,5).then( data => {
            collection.setCollections(data.rows)
            collection.setTotalCount(data.count)
            collection.refresh = false
        })
    }, [author, collection.refresh])

    return (
        <div>
            <Button
                variant="primary"
                onClick={() => setCollectionVisible(true)}
            >
                Create collection
            </Button>

            <CollectionList collections = {collection.collections} title={`Collections of user ` + author.email}/>

            <CreateCollection
                show={collectionVisible}
                onHide={ () => setCollectionVisible(false)}
                userId={author.id}
            />
        </div>
    );
};

export default UserPageContent;