import React, {useEffect} from 'react';
import {fetchOneItem} from "../http/itemAPI";
import { FormattedMessage } from 'react-intl'

const ItemProps = () => {


    return (
        <div>
            <FormattedMessage id='props.not.found' />
        </div>
    );
};

export default ItemProps;