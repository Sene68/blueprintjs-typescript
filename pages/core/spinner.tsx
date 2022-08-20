import React, { useState } from 'react';

import { H5, Intent, Label, Slider, Spinner, SpinnerSize, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from '@blueprintjs/docs-theme';

import { IntentSelect } from '../../components/common/intentSelect';

import '@blueprintjs/core/lib/css/blueprint.css';

export interface ISpinnerExampleState {
    hasValue: boolean;
    intent: Intent;
    size: number;
    value: number;
}

export default function SpinnerExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ISpinnerExampleState>({
        hasValue: false,
        intent: Intent.NONE,
        size: SpinnerSize.STANDARD,
        value: 0.7,
    });

    const spinnerSizeLabelId = 'spinner-size-label';

    const handleIndeterminateChange = handleBooleanChange((hasValue: boolean) =>
        setState({
            ...state,
            hasValue: hasValue,
        }),
    );

    const handleModifierChange = handleValueChange((intent: Intent) =>
        setState({
            ...state,
            intent: intent,
        }),
    );

    const renderLabel = (value: number) => value.toFixed(1);

    const valueChange = (value: number) =>
        setState({
            ...state,
            value: value,
        });

    const handleSizeChange = (size: number) =>
        setState({
            ...state,
            size: size,
        });

    const options = (
        <>
            <H5>Props</H5>
            <IntentSelect intent={state.intent} onChange={handleModifierChange} />
            <Label id={spinnerSizeLabelId}>Size</Label>
            <Slider
                labelStepSize={50}
                min={0}
                max={SpinnerSize.LARGE * 2}
                showTrackFill={false}
                stepSize={5}
                value={state.size}
                onChange={handleSizeChange}
                handleHtmlProps={{ 'aria-labelledby': spinnerSizeLabelId }}
            />
            <Switch checked={state.hasValue} label="Known value" onChange={handleIndeterminateChange} />
            <Slider
                disabled={!state.hasValue}
                labelStepSize={1}
                min={0}
                max={1}
                onChange={valueChange}
                labelRenderer={renderLabel}
                stepSize={0.1}
                showTrackFill={false}
                value={state.value}
                handleHtmlProps={{ 'aria-label': 'spinner value' }}
            />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <Spinner
                aria-label={state.hasValue ? `Loading ${state.value * 100}% complete` : 'Loading...'}
                intent={state.intent}
                size={state.size}
                value={state.hasValue ? state.value : undefined}
            />
        </Example>
    );
}
