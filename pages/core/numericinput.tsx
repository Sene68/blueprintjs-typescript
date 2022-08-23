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
    displayLeftIcon?: string;
    displayLeftElement?: string;
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

    const [intent, setIntent] = useState<Intent>(Intent.NONE);

    const [locale, setLocale] = useState<string>('');
    const [leftIcon, setLeftIcon] = useState<boolean>(false);
    const [leftElement, setLeftElement] = useState<boolean>(false);

    const [leftSwitch, setLeftSwitch] = useState<LeftSwitchProp>({
        displayLeftIcon: '',
        displayLeftElement: '',
    });

    const handleMaxChange = handleNumberChange((max: number) =>
        setState({
            ...state,
            max: max,
        }),
    );

    const handleMinChange = handleNumberChange((min: number) =>
        setState({
            ...state,
            min: min,
        }),
    );

    const handleIntentChange = handleValueChange((intent: Intent) =>
        setState({
            ...state,
            intent: intent,
        }),
    );

    const handleButtonPositionChange = handleValueChange((buttonPosition: NumericInputProps['buttonPosition']) =>
        setState({
            ...state,
            buttonPosition: buttonPosition,
        }),
    );

    const handleLocaleChange = handleStringChange((locale: string) => setLocale(locale));

    const toggleDisabled = handleBooleanChange((disabled: boolean) =>
        setState({
            ...state,
            disabled: disabled,
        }),
    );

    const toggleLeftIcon = handleBooleanChange((leftIcon: boolean) =>
        setLeftSwitch({
            ...leftSwitch,
            displayLeftIcon: leftIcon ? 'dollar' : undefined,
        }),
    );

    const toggleLeftElement = handleBooleanChange((leftElement) =>
        setState({
            leftElement: leftElement ? (
                <Popover2
                    position="bottom"
                    content={
                        <Menu>
                            <MenuItem icon={IconNames.Equals} text={'Equals'} />
                            <MenuItem icon={IconNames.LessThan} text={'Less than'} />
                            <MenuItem icon={IconNames.GreaterThan} text={'Greater than'} />
                        </Menu>
                    }
                >
                    <Button minimal={true} icon={IconNames.Filter} />
                </Popover2>
            ) : undefined,
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

    const toggleSelectAllOnFocus = handleBooleanChange((selectAllOnFocus: boolean) =>
        setState({
            ...state,
            selectAllOnFocus: selectAllOnFocus,
        }),
    );

    const toggleSelectAllOnIncrement = handleBooleanChange((selectAllOnIncrement: boolean) =>
        setState({
            ...state,
            selectAllOnIncrement: selectAllOnIncrement,
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
            {renderSwitch('Left icon', leftIcon != null, toggleLeftIcon)}
            {renderSwitch('Left element', leftElement != null, toggleLeftElement)}
            {renderSwitch('Numeric characters only', state.allowNumericCharactersOnly, toggleNumericCharsOnly)}
            {renderSwitch('Select all on focus', state.selectAllOnFocus, toggleSelectAllOnFocus)}
            {renderSwitch('Select all on increment', state.selectAllOnIncrement, toggleSelectAllOnIncrement)}
            {renderSelectMenu('Minimum value', state.min, MIN_VALUES, handleMinChange)}
            {renderSelectMenu('Maximum value', state.max, MAX_VALUES, handleMaxChange)}
            {renderSelectMenu('Button position', state.buttonPosition, BUTTON_POSITIONS, handleButtonPositionChange)}
            <IntentSelect intent={intent} onChange={handleIntentChange} />
            {renderSelectMenu('Locale', locale, [{ label: 'Default', value: 0 }, ...LOCALES], handleLocaleChange)}
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <NumericInput {...state} placeholder="Enter a number..." onValueChange={valueChange} />
        </Example>
    );
}
