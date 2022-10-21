import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import CollectionList from "../components/CollectionList";
import {createCollection, fetchCollections} from "../http/collectionAPI";
import {Container, Button, Row, Col} from "react-bootstrap";
import CreateCollection from "../components/modals/CreateCollection";

const UserPage = () => {
    const [collectionVisible, setCollectionVisible] = useState(false)
    const {user} = useContext(Context)
    const {collection} = useContext(Context)
    const userId = user.user.id

    useEffect( () => {
        fetchCollections(userId,5).then( data => {
            collection.setCollections(data.rows)
            collection.setTotalCount(data.count)
            collection.refresh = false
        })
    }, [collection.refresh])

    return (
        <Container>
            <Button
                variant="primary"
                onClick={() => setCollectionVisible(true)}
            >
                Create collection
            </Button>

            <CollectionList collections = {collection.collections} title={`Collections of user ` + user.user.email}/>

            <CreateCollection
                show={collectionVisible}
                onHide={ () => setCollectionVisible(false)}
                userId={userId}
            />
        </Container>
    );
};

export default UserPage;

//У каждого юзера есть личная страница, на которой он управляет своими коллекциями (создает, удаляет,
// редактирует) — каждая коллекция в списке это ссылка на страницу коллекции, которая содержит таблицу айтемов
// с сортировками и фильтрами и возможностью создать новый айтем, удалить или отредактировать существующий.

//     Каждая коллекция имеет название, описание (с поддержкой форматировать markdown), тему (одно значение из
    // фиксированного справочника, например, “Books”, “Signs”, “Silverware”), опционального изображения
// (загружается пользователем в облако).