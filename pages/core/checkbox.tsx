import React, { useState } from 'react';
import { Alignment, Checkbox, H5, Label, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, IExampleProps } from '@blueprintjs/docs-theme';

import AlignmentSelect from '../../components/common/alignmentSelect';

import '@blueprintjs/core/lib/css/blueprint.css';

export interface ICheckboxExampleState {
    alignIndicator: Alignment;
    disabled: boolean;
    inline: boolean;
    large: boolean;
    value?: string;
}

export default function CheckboxExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ICheckboxExampleState>({
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

    const renderExample = (
        <div>
            <Label>Assign responsibility</Label>
            <Checkbox {...state} label="Gilad Gray" defaultIndeterminate={true} />
            <Checkbox {...state} label="Jason Killian" />
            <Checkbox {...state} label="Antoine Llorca" />
        </div>
    );

    return (
        <Example options={options} {...IExampleProps}>
            {renderExample}
        </Example>
    );
}
