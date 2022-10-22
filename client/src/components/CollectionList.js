import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Collection from "./Collection";
import {Table} from "react-bootstrap";

const CollectionList = ({collections,title}) => {


    title = title || 'Collections list'
    return (
        <div>
            <h1>{title}</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Items Count</th>
                    <th>Tool bar</th>
                </tr>
                </thead>
                <tbody>
                    {
                        collections.map( (collection, index) =>
                            <Collection
                                index={index + 1}
                                collection={collection}
                                key={collection.id}
                                id={collection.id}
                            />
                        )
                    }
                </tbody>
            </Table>

        </div>
    );
};

export default CollectionList;