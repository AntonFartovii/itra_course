import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import BanUser from "./modals/BanUser";
import AdminUser from "./modals/AdminUser";
import DeleteUser from "./modals/DeleteUser";
import { FormattedMessage } from 'react-intl'

const UserBar = ({id}) => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [adminVisible, setAdminVisible] = useState(false)
    const [banVisible, setBanVisible] = useState(false)

    return (
        <div>
            <Button className="ml-2 mx-2" variant="secondary" onClick={() => setBanVisible(true)}>
                <FormattedMessage id='button.ban' />
            </Button>
            <Button className="ml-2 mx-2" variant="secondary" onClick={() => setAdminVisible(true)}>
                <FormattedMessage id='button.admin' />
            </Button>
            <Button className="ml-2 mx-2" variant="danger" onClick={() => setDeleteVisible(true)}>
                <FormattedMessage id='button.delete' />
            </Button>

            <BanUser
                show={banVisible}
                onHide={ () => setBanVisible(false)}
                id={id}
            />
            <AdminUser
                show={adminVisible}
                onHide={ () => setAdminVisible(false)}
                id={id}
            />
            <DeleteUser
                show={deleteVisible}
                onHide={ () => setDeleteVisible(false)}
                id={id}
            />
        </div>
    );
};

export default UserBar;