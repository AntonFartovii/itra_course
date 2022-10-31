import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import themes from "../../constants/themes";

const CollectionForm = observer(({form, setForm}) => {

    return (
        <Form>
            <Form.Label>Enter name</Form.Label>
            <Form.Control
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
            />

            <Form.Label>Enter theme</Form.Label>

            <Form.Select
                style={{width:'130px'}}
                onChange={ e => setForm({...form, theme: e.target.value})}
                defaultValue={form.theme}
            >
                {
                    themes.map( theme =>
                        <option key={'option_' + theme} value={theme}>{theme}</option>
                    )
                }
            </Form.Select>


            <Form.Label>Select file</Form.Label>
            <Form.Control
                onChange={e=> {
                        setForm(
                            {...form,
                                file: e.target.files[0],
                                newImg: e.target.files[0].name}
                            )}}
                className="mt-3"
                type="file"
            />
            <Form.Control
                type="hidden"
                value={form.img}
            />

            <Form.Label>Enter description</Form.Label>
            <Form.Control
                as="textarea"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
            />
        </Form>
    );
});

export default CollectionForm;