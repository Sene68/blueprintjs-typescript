import React, { useState } from 'react';

import { Button, ButtonGroup, Divider, H5, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, IExampleProps } from '@blueprintjs/docs-theme';

import '@blueprintjs/core/lib/css/blueprint.css';

export interface IDividerExampleState {
    vertical: boolean;
}

export default function DividerExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IDividerExampleState>({
        vertical: false,
    });

    const handleVerticalChange = handleBooleanChange((vertical: boolean) =>
        setState({
            ...state,
            vertical: vertical,
        }),
    );

    const options = (
        <>
            <H5>Example props</H5>
            <Switch checked={state.vertical} label="Vertical" onChange={handleVerticalChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <ButtonGroup minimal={true} vertical={state.vertical}>
                <Button text="File" />
                <Button text="Edit" />
                <Divider />
                <Button text="Create" />
                <Button text="Delete" />
                <Divider />
                <Button icon="add" />
                <Button icon="remove" />
            </ButtonGroup>
        </Example>
    );
}
