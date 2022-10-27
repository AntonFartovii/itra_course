import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import CreateTag from "./modals/CreateTag";

const TagBar = () => {
    const [addVisible, setAddVisible] = useState(false)

    return (
        <div>

            <Button className="mx-2" variant="outline-primary" onClick={() => setAddVisible(true)}>
                <FormattedMessage id='button.add' />
            </Button>

            <CreateTag
                show={addVisible}
                onHide={ () => setAddVisible(false)}
            />
        </div>
    );
};

export default TagBar;