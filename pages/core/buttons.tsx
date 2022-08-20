import React, { useState } from 'react';

import { AnchorButton, Button, Code, H5, Intent, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from '@blueprintjs/docs-theme';

import { IntentSelect } from '../../components/common/intentSelect';
import { Size, SizeSelect } from '../../components/common/sizeSelect';
import '@blueprintjs/core/lib/css/blueprint.css';

export interface IButtonsExampleState {
    active: boolean;
    disabled: boolean;
    intent: Intent;
    loading: boolean;
    minimal: boolean;
    outlined: boolean;
    size: Size;
}

type intentType = {
    [key: string]: Intent;
};

const intentTypes: intentType = {
    none: Intent.NONE,
    primary: Intent.PRIMARY,
    success: Intent.SUCCESS,
    warning: Intent.WARNING,
    danger: Intent.DANGER,
};

export default function ButtonsExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IButtonsExampleState>({
        active: false,
        disabled: false,
        intent: Intent.NONE,
        loading: false,
        minimal: false,
        outlined: false,
        size: 'regular',
    });

    const [iconOnly, setIconOnly] = useState<boolean>(false);

    const handleActiveChange = () => {
        setState({
            ...state,
            active: !state.active,
        });
    };

    const handleDisabledChange = () => {
        setState({
            ...state,
            disabled: !state.disabled,
        });
    };

    const handleLoadingChange = () => {
        setState({
            ...state,
            loading: !state.loading,
        });
    };

    const handleMinimalChange = () => {
        setState({
            ...state,
            minimal: !state.minimal,
        });
    };

    const handleOutlinedChange = () => {
        setState({
            ...state,
            outlined: !state.outlined,
        });
    };

    const handleSizeChange = (size: Size) => {
        setState({
            ...state,
            size: size,
        });
    };

    const handleIntentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const intentType = e.target.value;
        const intent = intentTypes[intentType];
        setState({
            ...state,
            intent: intent,
        });
    };

    const handleIconOnlyChange = () => {
        setIconOnly(!iconOnly);
    };

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Active" checked={state.active} onChange={handleActiveChange} />
            <Switch label="Disabled" checked={state.disabled} onChange={handleDisabledChange} />
            <Switch label="Loading" checked={state.loading} onChange={handleLoadingChange} />
            <Switch label="Minimal" checked={state.minimal} onChange={handleMinimalChange} />
            <Switch label="Outlined" checked={state.outlined} onChange={handleOutlinedChange} />
            <SizeSelect size={state.size} onChange={handleSizeChange} />
            <IntentSelect intent={state.intent} onChange={handleIntentChange} />
            <H5>Example</H5>
            <Switch label="Icons only" checked={iconOnly} onChange={handleIconOnlyChange} />
        </>
    );

    return (
        <Example options={options}>
            <div>
                <p>
                    <Code>Button</Code>
                </p>
                <Button icon="refresh" small={state.size === 'small'} large={state.size === 'large'} {...state}>
                    {!iconOnly && 'Click to wiggle'}
                </Button>
            </div>
            <div>
                <p>
                    <Code>AnchorButton</Code>
                </p>
                <AnchorButton
                    href="#core/components/button"
                    icon="duplicate"
                    rightIcon="share"
                    target="_blank"
                    text={iconOnly ? undefined : 'Duplicate this page'}
                    small={state.size === 'small'}
                    large={state.size === 'large'}
                    {...state}
                />
            </div>
        </Example>
    );
}
