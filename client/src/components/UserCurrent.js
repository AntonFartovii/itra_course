import React from 'react';

const UserCurrent = ({user, message}) => {
    return (
        <div>
            <h2>Страница пользователя {user.email}</h2>
            <ul>
                <li>ID: {user.id}</li>
                <li>Email: {user.email}</li>
                <li>Role: {user.role}</li>
            </ul>
        </div>
    );
};

export default UserCurrent;