import React, { useState } from 'react';

import { H5, Intent, ProgressBar, Slider, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from '@blueprintjs/docs-theme';

import { IntentSelect } from '../../components/common/intentSelect';

import '@blueprintjs/core/lib/css/blueprint.css';

export interface IProgressExampleState {
    hasValue: boolean;
    intent: Intent;
    value?: number;
}

export default function ProgressExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IProgressExampleState>({
        hasValue: false,
        intent: Intent.NONE,
        value: 0.7,
    });

    const handleIndeterminateChange = handleBooleanChange((hasValue: boolean) =>
        setState({
            ...state,
            hasValue: hasValue,
        }),
    );

    const handleIntentChange = handleValueChange((intent: Intent) =>
        setState({
            ...state,
            intent: intent,
        }),
    );

    const renderLabel = (value: number) => value.toFixed(1);

    const valueChange = (value?: number) =>
        setState({
            ...state,
            value: value,
        });

    const options = (
        <>
            <H5>Props</H5>
            <IntentSelect intent={state.intent} onChange={handleIntentChange} />
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
                handleHtmlProps={{ 'aria-label': 'progressbar value' }}
            />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <ProgressBar intent={state.intent} value={state.hasValue ? state.value : undefined} />
        </Example>
    );
}
