import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import CreatePropValue from "./components/modals/createPropValue";
import {observer} from "mobx-react-lite";
import {Context} from "./index";

const Prop = observer(({data, itemId}) => {
    const {user} = useContext(Context)
    const [addVisible, setAddVisible] = useState(false)

    const [prop, setProp] = useState( data )

    const createProperty = (newValues) => {
        setProp({...prop, values: newValues})
    }

    return (
            <tr>
                <td>
                    {prop.name} {prop.collectionId}
                </td>
                <td>
                    {prop.type}
                </td>
                <td>
                    {   prop &&
                        prop.type === 'checkbox' &&
                        <Form.Check
                            type="checkbox"
                            id={prop.id}
                            checked={prop.values[0] && prop.values[0]['checkbox']}
                            readOnly
                        />
                    }
                    {
                        prop.type !== 'checkbox' &&
                        prop.values[0] &&
                        prop.values[0][prop.type]

                    }
                </td>
                {
                    user.isAuth &&
                    <td>


                        <Button
                            className="mt-2"
                            onClick={() => setAddVisible(true)}
                            variant="primary"
                        >
                            Добавить/Изменить
                        </Button>
                    </td>
                }
                <CreatePropValue
                    show={addVisible}
                    onHide={ () => setAddVisible(false)}
                    itemId={itemId}
                    create={createProperty}
                    prop={prop}

                />
            </tr>
    );
});

export default Prop;