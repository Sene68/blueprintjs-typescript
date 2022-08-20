import React, { useState } from 'react';

import { Button, ControlGroup, HTMLSelect, InputGroup, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, IExampleProps } from '@blueprintjs/docs-theme';

import '@blueprintjs/core/lib/css/blueprint.css';

const FILTER_OPTIONS = ['Filter', 'Name - ascending', 'Name - descending', 'Price - ascending', 'Price - descending'];

export interface IControlGroupExampleState {
    fill: boolean;
    vertical: boolean;
}

export default function ControlGroupExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IControlGroupExampleState>({
        fill: false,
        vertical: false,
    });

    const toggleFill = handleBooleanChange((fill: boolean) =>
        setState({
            ...state,
            fill: fill,
        }),
    );

    const toggleVertical = handleBooleanChange((vertical: boolean) =>
        setState({
            ...state,
            vertical: vertical,
        }),
    );

    const options = (
        <>
            <Switch checked={state.fill} label="Fill" onChange={toggleFill} />
            <Switch checked={state.vertical} label="Vertical" onChange={toggleVertical} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <ControlGroup {...state}>
                <HTMLSelect options={FILTER_OPTIONS} />
                <InputGroup placeholder="Find filters..." />
                <Button icon="arrow-right" />
            </ControlGroup>
        </Example>
    );
}
