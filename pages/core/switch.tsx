import React, { useState } from 'react';

import { Alignment, Code, H5, Label, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, IExampleProps } from '@blueprintjs/docs-theme';

import AlignmentSelect from '../../components/common/alignmentSelect';

import '@blueprintjs/core/lib/css/blueprint.css';

export interface ISwitchExampleState {
    alignIndicator: Alignment;
    disabled: boolean;
    inline: boolean;
    large: boolean;
    value?: string;
}

export default function SwitchExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ISwitchExampleState>({
        alignIndicator: Alignment.LEFT,
        disabled: false,
        inline: false,
        large: false,
    });

    const handleAlignChange = (alignIndicator: Alignment) =>
        setState({
            ...state,
            alignIndicator: alignIndicator,
        });

    const handleDisabledChange = handleBooleanChange((disabled: boolean) =>
        setState({
            ...state,
            disabled: disabled,
        }),
    );

    const handleInlineChange = handleBooleanChange((inline: boolean) =>
        setState({
            ...state,
            inline: inline,
        }),
    );

    const handleLargeChange = handleBooleanChange((large: boolean) =>
        setState({
            ...state,
            large: large,
        }),
    );

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.disabled} label="Disabled" onChange={handleDisabledChange} />
            <Switch checked={state.inline} label="Inline" onChange={handleInlineChange} />
            <Switch checked={state.large} label="Large" onChange={handleLargeChange} />
            <AlignmentSelect
                align={state.alignIndicator}
                allowCenter={false}
                label="Align indicator"
                onChange={handleAlignChange}
            />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <div>
                <Label>Privacy setting</Label>
                <Switch {...state} labelElement={<strong>Enabled</strong>} />
                <Switch {...state} labelElement={<em>Public</em>} />
                <Switch {...state} labelElement={<u>Cooperative</u>} defaultChecked={true} />
                <Switch {...state} labelElement={'Containing Text'} innerLabelChecked="on" innerLabel="off" />
            </div>
            <small style={{ width: '100%', textAlign: 'center' }}>
                This example uses <Code>labelElement</Code> to demonstrate JSX labels.
            </small>
        </Example>
    );
}
