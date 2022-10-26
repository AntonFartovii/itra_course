import React from 'react';
import {FormattedMessage} from "react-intl";

const UserCurrent = ({user, message}) => {
    return (
        <div>
            <h2><FormattedMessage id='user.page.title' /> {user.email}</h2>
            <ul>
                <li>ID: {user.id}</li>
                <li>Email: {user.email}</li>
                <li>Role: {user.role}</li>
            </ul>
        </div>
    );
};

export default UserCurrent;