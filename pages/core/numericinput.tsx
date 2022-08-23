import React, { useState } from 'react';

import {
    Button,
    H5,
    HTMLSelect,
    Intent,
    Label,
    Menu,
    MenuItem,
    NumericInput,
    NumericInputProps,
    OptionProps,
    Position,
    Switch,
} from '@blueprintjs/core';
import {
    Example,
    IExampleProps,
    handleBooleanChange,
    handleNumberChange,
    handleStringChange,
    handleValueChange,
} from '@blueprintjs/docs-theme';
import { IconNames } from '@blueprintjs/icons';
import { Popover2 } from '@blueprintjs/popover2';

import { IntentSelect } from '../../components/common/intentSelect';
import { LOCALES } from '../../components/common/locales';

import '@blueprintjs/core/lib/css/blueprint.css';

const MIN_VALUES = [
    { label: 'None', value: -Infinity },
    { label: '-10', value: -10 },
    { label: '0', value: 0 },
    { label: '20', value: 20 },
];

const MAX_VALUES = [
    { label: 'None', value: +Infinity },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
];

const BUTTON_POSITIONS = [
    { label: 'None', value: 'none' },
    { label: 'Left', value: Position.LEFT },
    { label: 'Right', value: Position.RIGHT },
];

export interface LeftSwitchProp {
    leftIcon?: string | boolean;
    leftElement?: string | boolean;
}

export default function NumericInputBasicExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<NumericInputProps>({
        allowNumericCharactersOnly: true,
        buttonPosition: 'right',
        disabled: false,
        fill: false,
        large: false,
        majorStepSize: 10,
        max: 100,
        min: 0,
        minorStepSize: 0.1,
        selectAllOnFocus: false,
        selectAllOnIncrement: false,
        stepSize: 1,
        value: '',
    });

    const handleMaxChange = handleNumberChange((max: number) =>
        setState({
            max: max,
        }),
    );

    const handleMinChange = handleNumberChange((min: number) =>
        setState({
            min: min,
        }),
    );

    const handleButtonPositionChange = handleValueChange((buttonPosition: NumericInputProps['buttonPosition']) =>
        setState({
            ...state,
            buttonPosition: buttonPosition,
        }),
    );

    const toggleDisabled = handleBooleanChange((disabled: boolean) =>
        setState({
            ...state,
            disabled: disabled,
        }),
    );

    const toggleFullWidth = handleBooleanChange((fill: boolean) =>
        setState({
            ...state,
            fill: fill,
        }),
    );

    const toggleLargeSize = handleBooleanChange((large: boolean) =>
        setState({
            ...state,
            large: large,
        }),
    );

    const toggleNumericCharsOnly = handleBooleanChange((allowNumericCharactersOnly: boolean) =>
        setState({
            ...state,
            allowNumericCharactersOnly: allowNumericCharactersOnly,
        }),
    );

    const renderSwitch = (label: string, checked?: boolean, onChange?: React.FormEventHandler<HTMLElement>) => {
        return <Switch checked={checked} label={label} onChange={onChange} />;
    };

    const renderSelectMenu = (
        label: string,
        value?: number | string,
        options?: OptionProps[],
        onChange?: React.FormEventHandler,
    ) => {
        return (
            <Label>
                {label}
                <HTMLSelect {...{ value, onChange, options }} />
            </Label>
        );
    };

    const valueChange = (_v: number, value: string) =>
        setState({
            ...state,
            value: value,
        });

    const options = (
        <>
            <H5>Props</H5>
            {renderSwitch('Disabled', state.disabled, toggleDisabled)}
            {renderSwitch('Fill', state.fill, toggleFullWidth)}
            {renderSwitch('Large', state.large, toggleLargeSize)}
            {renderSwitch('Numeric characters only', state.allowNumericCharactersOnly, toggleNumericCharsOnly)}
            {renderSelectMenu('Minimum value', state.min, MIN_VALUES, handleMinChange)}
            {renderSelectMenu('Maximum value', state.max, MAX_VALUES, handleMaxChange)}
            {renderSelectMenu('Button position', state.buttonPosition, BUTTON_POSITIONS, handleButtonPositionChange)}
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <NumericInput {...state} placeholder="Enter a number..." onValueChange={valueChange} />
        </Example>
    );
}
