import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from 'react-router-dom'
import {fetchUser} from "../http/userAPI";
import UserCurrent from "../components/UserCurrent";
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchCollections} from "../http/collectionAPI";
import CollectionList from "../components/CollectionList";
import { FormattedMessage } from 'react-intl'

const UserPage = observer(() => {
    const {user} = useContext(Context)

    const [author, setAuthor] = useState({})
    const [collections, setCollections] = useState({})

    const {id} = useParams()
    const userId = id ? id : user.user.id

    useEffect(() => {
        fetchUser(userId).then(data => setAuthor(data))
    }, [])

    useEffect( () => {
        fetchCollections(userId, 10).then(
            data => setCollections(data.rows)
        )
    },[])

    if (id && !user.isAdmin) {
        return (<h1><FormattedMessage id='permission.message' /></h1>);
    }

    return (
        <div>

            <UserCurrent user={author}/>

            <CollectionList
                collections={collections}
                setCollections={setCollections}
                userId={userId}
                title={<FormattedMessage id='user.page.collections.title' />}
            />

        </div>
    )
});

export default UserPage;

//У каждого юзера есть личная страница, на которой он управляет своими коллекциями (создает, удаляет,
// редактирует) — каждая коллекция в списке это ссылка на страницу коллекции, которая содержит таблицу айтемов
// с сортировками и фильтрами и возможностью создать новый айтем, удалить или отредактировать существующий.

//     Каждая коллекция имеет название, описание (с поддержкой форматировать markdown), тему (одно значение из
    // фиксированного справочника, например, “Books”, “Signs”, “Silverware”), опционального изображения
// (загружается пользователем в облако).