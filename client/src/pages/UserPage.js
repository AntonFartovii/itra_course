import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from 'react-router-dom'
import UserPageContent from "../components/UserPageContent";
import {fetchUser} from "../http/userAPI";
import UserCurrent from "../components/UserCurrent";
import {Button, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchCollections} from "../http/collectionAPI";
import CollectionList from "../components/CollectionList";
import data from "bootstrap/js/src/dom/data";

const UserPage = observer(() => {
    const [author, setAuthor] = useState({})
    // const [collections, setCollections] = useState([])
    const {user, collection} = useContext(Context)
    const {id} = useParams()
    const userId = id ? id : user.user.id



    useEffect(() => {
        fetchUser(userId).then(data => setAuthor(data))
    }, [])

    useEffect( () => {
        fetchCollections(userId, 10).then(data => collection.setCollections(data.rows))
    },[])

    if (id & !user.isAdmin) {
        return (<h1>У вас нет прав</h1>);
    }

    return (
        <Container>
            <UserCurrent user={author}/>
            <CollectionList
                collections={collection.collections}
                userId={userId}
            />
            {/*<UserPageContent author={author}/>*/}
        </Container>
    )
});

export default UserPage;

//У каждого юзера есть личная страница, на которой он управляет своими коллекциями (создает, удаляет,
// редактирует) — каждая коллекция в списке это ссылка на страницу коллекции, которая содержит таблицу айтемов
// с сортировками и фильтрами и возможностью создать новый айтем, удалить или отредактировать существующий.

//     Каждая коллекция имеет название, описание (с поддержкой форматировать markdown), тему (одно значение из
    // фиксированного справочника, например, “Books”, “Signs”, “Silverware”), опционального изображения
// (загружается пользователем в облако).