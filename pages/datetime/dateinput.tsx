import classNames from 'classnames';
import React, { useState } from 'react';

import { Classes, H5, Switch, Tag } from '@blueprintjs/core';
import { DateFormatProps, TimePrecision } from '@blueprintjs/datetime';
import { DateInput2 } from '@blueprintjs/datetime2';
import { Example, IExampleProps, handleBooleanChange, handleValueChange } from '@blueprintjs/docs-theme';

import { PropCodeTooltip } from '../../components/common/propCodeTooltip';
import { PrecisionSelect } from '../../components/common/precisionSelect';
import { DATE_FNS_FORMATS, DateFnsFormatSelector } from '../../components/common/dateFnsFormatSelector';

import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

export interface DateInput2ExampleState {
    closeOnSelection: boolean;
    date: string | null;
    disabled: boolean;
    disableTimezoneSelect: boolean;
    fill: boolean;
    format: DateFormatProps;
    reverseMonthAndYearMenus: boolean;
    shortcuts: boolean;
    showActionsBar: boolean;
    showRightElement: boolean;
    showTimePickerArrows: boolean;
    showTimezoneSelect: boolean;
    timePrecision: TimePrecision | undefined;
    useAmPm: boolean;
}

export default function DateInput2Example(IExampleProps: IExampleProps) {
    const [state, setState] = useState<DateInput2ExampleState>({
        closeOnSelection: true,
        date: null,
        disableTimezoneSelect: false,
        disabled: false,
        fill: false,
        format: DATE_FNS_FORMATS[0],
        reverseMonthAndYearMenus: false,
        shortcuts: false,
        showActionsBar: false,
        showRightElement: false,
        showTimePickerArrows: false,
        showTimezoneSelect: true,
        timePrecision: TimePrecision.MINUTE,
        useAmPm: false,
    });

    const toggleActionsBar = handleBooleanChange((showActionsBar: boolean) =>
        setState({ ...state, showActionsBar: showActionsBar }),
    );

    const toggleSelection = handleBooleanChange((closeOnSelection: boolean) =>
        setState({ ...state, closeOnSelection: closeOnSelection }),
    );

    const toggleShortcuts = handleBooleanChange((shortcuts: boolean) => setState({ ...state, shortcuts: shortcuts }));

    const toggleDisabled = handleBooleanChange((disabled: boolean) => setState({ ...state, disabled: disabled }));

    const toggleShowTimezoneSelect = handleBooleanChange((showTimezoneSelect: boolean) =>
        setState({ ...state, showTimezoneSelect: showTimezoneSelect }),
    );

    const toggleDisableTimezoneSelect = handleBooleanChange((disableTimezoneSelect: boolean) =>
        setState({ ...state, disableTimezoneSelect: disableTimezoneSelect }),
    );

    const toggleFill = handleBooleanChange((fill: boolean) => setState({ ...state, fill: fill }));

    const toggleReverseMenus = handleBooleanChange((reverse: boolean) =>
        setState({ ...state, reverseMonthAndYearMenus: reverse }),
    );

    const toggleTimePickerArrows = handleBooleanChange((showTimePickerArrows: boolean) =>
        setState({ ...state, showTimePickerArrows: showTimePickerArrows }),
    );

    const toggleUseAmPm = handleBooleanChange((useAmPm: boolean) => setState({ ...state, useAmPm: useAmPm }));

    const handleTimePrecisionChange = handleValueChange((timePrecision: TimePrecision | 'none') =>
        setState({ ...state, timePrecision: timePrecision === 'none' ? undefined : timePrecision }),
    );

    const handleDateChange = (date: string | null) => {
        setState({ ...state, date: date });
    };

    const handleFormatChange = (format: DateFormatProps) => {
        setState({ ...state, format: format });
    };

    const isTimePickerShown = state.timePrecision !== undefined;

    const options = (
        <>
            <H5>Props</H5>
            <PropCodeTooltip snippet={`closeOnSelection={${state.closeOnSelection.toString()}}`}>
                <Switch label="Close on selection" checked={state.closeOnSelection} onChange={toggleSelection} />
            </PropCodeTooltip>
            <PropCodeTooltip snippet={`shortcuts={${state.shortcuts.toString()}}`}>
                <Switch
                    checked={state.shortcuts}
                    disabled={state.showActionsBar}
                    label="Show shortcuts"
                    onChange={toggleShortcuts}
                />
            </PropCodeTooltip>
            <PropCodeTooltip snippet={`showActionsBar={${state.showActionsBar.toString()}}`}>
                <Switch
                    checked={state.showActionsBar}
                    disabled={state.shortcuts}
                    label="Show actions bar"
                    onChange={toggleActionsBar}
                />
            </PropCodeTooltip>
            <PrecisionSelect
                allowNone={true}
                label="Time precision"
                onChange={handleTimePrecisionChange}
                value={state.timePrecision}
            />

            <H5>Appearance props</H5>
            <Switch label="Disabled" checked={state.disabled} onChange={toggleDisabled} />
            <Switch label="Fill" checked={state.fill} onChange={toggleFill} />
            <PropCodeTooltip snippet={`reverseMonthAndYearMenus={${state.reverseMonthAndYearMenus.toString()}}`}>
                <Switch
                    label="Reverse month and year menus"
                    checked={state.reverseMonthAndYearMenus}
                    onChange={toggleReverseMenus}
                />
            </PropCodeTooltip>
            <PropCodeTooltip
                snippet={`timePickerProps={{ showArrowButtons: ${state.showTimePickerArrows.toString()} }}`}
                disabled={!isTimePickerShown}
            >
                <Switch
                    label="Show time picker arrows"
                    checked={state.showTimePickerArrows}
                    disabled={!isTimePickerShown}
                    onChange={toggleTimePickerArrows}
                />
            </PropCodeTooltip>
            <PropCodeTooltip
                snippet={`timePickerProps={{ useAmPm: ${state.useAmPm.toString()} }}`}
                disabled={!isTimePickerShown}
            >
                <Switch
                    label="Use AM/PM time"
                    checked={state.useAmPm}
                    disabled={!isTimePickerShown}
                    onChange={toggleUseAmPm}
                />
            </PropCodeTooltip>

            <DateFnsFormatSelector format={state.format} onChange={handleFormatChange} />

            <H5 className={classNames({ [Classes.TEXT_DISABLED]: state.timePrecision === undefined })}>
                TimezoneSelect props
            </H5>
            <PropCodeTooltip
                snippet={`disableTimezoneSelect={${state.disableTimezoneSelect.toString()}}`}
                disabled={!isTimePickerShown}
            >
                <Switch
                    label="Disable timezone select"
                    checked={state.disableTimezoneSelect}
                    disabled={!isTimePickerShown}
                    onChange={toggleDisableTimezoneSelect}
                />
            </PropCodeTooltip>
            <PropCodeTooltip
                snippet={`showTimezoneSelect={${state.showTimezoneSelect.toString()}}`}
                disabled={!isTimePickerShown}
            >
                <Switch
                    label="Show timezone select"
                    checked={state.showTimezoneSelect}
                    disabled={!isTimePickerShown}
                    onChange={toggleShowTimezoneSelect}
                />
            </PropCodeTooltip>
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <DateInput2
                {...state}
                {...state.format}
                onChange={handleDateChange}
                popoverProps={{ placement: 'bottom' }}
                timePickerProps={
                    state.timePrecision === undefined ? undefined : { showArrowButtons: state.showTimePickerArrows }
                }
                value={state.date}
            />
            {state.date == null ? <Tag minimal={true}>no date</Tag> : <Tag intent="primary">{state.date}</Tag>}
        </Example>
    );
}
