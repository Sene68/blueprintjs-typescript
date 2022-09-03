import React, { useState } from 'react';

import { H5, Switch } from '@blueprintjs/core';
import { DateFormatProps, DateRange, TimePrecision } from '@blueprintjs/datetime';
import { DateRangeInput2 } from '@blueprintjs/datetime2';
import { Example, IExampleProps, handleBooleanChange } from '@blueprintjs/docs-theme';

import { MomentDateRange } from '../../components/common/momentDate';
import { DATE_FNS_FORMATS, DateFnsFormatSelector } from '../../components/common/dateFnsFormatSelector';

import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

export interface DateRangeInput2ExampleState {
    allowSingleDayRange: boolean;
    closeOnSelection: boolean;
    contiguousCalendarMonths: boolean;
    disabled: boolean;
    enableTimePicker: boolean;
    format: DateFormatProps;
    range: DateRange;
    reverseMonthAndYearMenus: boolean;
    selectAllOnFocus: boolean;
    shortcuts: boolean;
    singleMonthOnly: boolean;
    showTimeArrowButtons: boolean;
}

export default function DateRangeInput2Example(IExampleProps: IExampleProps) {
    const [state, setState] = useState<DateRangeInput2ExampleState>({
        allowSingleDayRange: false,
        closeOnSelection: false,
        contiguousCalendarMonths: true,
        disabled: false,
        enableTimePicker: false,
        format: DATE_FNS_FORMATS[0],
        range: [null, null],
        reverseMonthAndYearMenus: false,
        selectAllOnFocus: false,
        shortcuts: true,
        showTimeArrowButtons: false,
        singleMonthOnly: false,
    });

    const toggleContiguous = handleBooleanChange((contiguous: boolean) => {
        setState({ ...state, contiguousCalendarMonths: contiguous });
    });

    const toggleDisabled = handleBooleanChange((disabled: boolean) => setState({ ...state, disabled: disabled }));

    const toggleReverseMonthAndYearMenus = handleBooleanChange((reverseMonthAndYearMenus: boolean) =>
        setState({ ...state, reverseMonthAndYearMenus: reverseMonthAndYearMenus }),
    );

    const toggleSelection = handleBooleanChange((closeOnSelection: boolean) =>
        setState({ ...state, closeOnSelection: closeOnSelection }),
    );

    const toggleSelectAllOnFocus = handleBooleanChange((selectAllOnFocus: boolean) =>
        setState({ ...state, selectAllOnFocus: selectAllOnFocus }),
    );

    const toggleSingleDay = handleBooleanChange((allowSingleDayRange: boolean) =>
        setState({ ...state, allowSingleDayRange: allowSingleDayRange }),
    );

    const toggleSingleMonth = handleBooleanChange((singleMonthOnly: boolean) =>
        setState({ ...state, singleMonthOnly: singleMonthOnly }),
    );

    const toggleShortcuts = handleBooleanChange((shortcuts: boolean) => setState({ ...state, shortcuts: shortcuts }));

    const toggleTimePicker = handleBooleanChange((enableTimePicker: boolean) =>
        setState({ ...state, enableTimePicker: enableTimePicker }),
    );

    const toggleTimepickerArrowButtons = handleBooleanChange((showTimeArrowButtons: boolean) =>
        setState({ ...state, showTimeArrowButtons: showTimeArrowButtons }),
    );

    const handleFormatChange = (format: DateFormatProps) => setState({ ...state, format: format });

    const handleRangeChange = (range: DateRange) => setState({ ...state, range: range });

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.allowSingleDayRange} label="Allow single day range" onChange={toggleSingleDay} />
            <Switch checked={state.singleMonthOnly} label="Single month only" onChange={toggleSingleMonth} />
            <Switch checked={state.shortcuts} label="Show shortcuts" onChange={toggleShortcuts} />
            <Switch checked={state.closeOnSelection} label="Close on selection" onChange={toggleSelection} />
            <Switch
                checked={state.contiguousCalendarMonths}
                label="Constrain calendar to contiguous months"
                onChange={toggleContiguous}
            />
            <Switch checked={state.disabled} label="Disabled" onChange={toggleDisabled} />
            <Switch checked={state.selectAllOnFocus} label="Select all on focus" onChange={toggleSelectAllOnFocus} />
            <Switch
                checked={state.reverseMonthAndYearMenus}
                label="Reverse month and year menus"
                onChange={toggleReverseMonthAndYearMenus}
            />
            <Switch checked={state.enableTimePicker} label="Enable time picker" onChange={toggleTimePicker} />
            <Switch
                disabled={!state.enableTimePicker}
                checked={state.showTimeArrowButtons}
                label="Show timepicker arrow buttons"
                onChange={toggleTimepickerArrowButtons}
            />
            <DateFnsFormatSelector key="Format" format={state.format} onChange={handleFormatChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <DateRangeInput2
                {...state}
                {...state.format}
                onChange={handleRangeChange}
                timePickerProps={
                    state.enableTimePicker
                        ? { precision: TimePrecision.MINUTE, showArrowButtons: state.showTimeArrowButtons }
                        : undefined
                }
            />
            <MomentDateRange withTime={undefined} range={state.range} />
        </Example>
    );
}
