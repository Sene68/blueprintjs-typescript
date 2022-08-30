import moment from 'moment';
import React, { useState } from 'react';

import { Classes, H5, HTMLSelect, Label, Switch } from '@blueprintjs/core';
import { DateRange, DateRangePicker, TimePrecision } from '@blueprintjs/datetime';
import {
    Example,
    IExampleProps,
    handleBooleanChange,
    handleNumberChange,
    handleValueChange,
} from '@blueprintjs/docs-theme';

import { MomentDateRange } from '../../components/common/momentDate';

import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

export interface IDateRangePickerExampleState {
    allowSingleDayRange?: boolean;
    singleMonthOnly?: boolean;
    contiguousCalendarMonths?: boolean;
    dateRange: DateRange;
    maxDateIndex: number;
    minDateIndex: number;
    reverseMonthAndYearMenus?: boolean;
    shortcuts?: boolean;
    timePrecision?: TimePrecision;
}

interface IDateOption {
    label: string;
    value?: Date;
}

const MIN_DATE_OPTIONS: IDateOption[] = [
    { label: 'None', value: undefined },
    {
        label: '4 months ago',
        value: moment().add(-4, 'months').toDate(),
    },
    {
        label: '1 year ago',
        value: moment().add(-1, 'years').toDate(),
    },
];

const MAX_DATE_OPTIONS: IDateOption[] = [
    { label: 'None', value: undefined },
    {
        label: '4 months from now',
        value: moment().add(4, 'months').toDate(),
    },
    {
        label: '1 year from now',
        value: moment().add(1, 'years').toDate(),
    },
];

export default function DateRangePickerExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IDateRangePickerExampleState>({
        allowSingleDayRange: false,
        contiguousCalendarMonths: true,
        dateRange: [null, null],
        maxDateIndex: 0,
        minDateIndex: 0,
        reverseMonthAndYearMenus: false,
        shortcuts: true,
        singleMonthOnly: false,
    });

    const handleMaxDateIndexChange = handleNumberChange((maxDateIndex: number) =>
        setState({ ...state, maxDateIndex: maxDateIndex }),
    );

    const handleMinDateIndexChange = handleNumberChange((minDateIndex: number) =>
        setState({ ...state, minDateIndex: minDateIndex }),
    );

    const toggleReverseMonthAndYearMenus = handleBooleanChange((reverseMonthAndYearMenus: boolean) =>
        setState({ ...state, reverseMonthAndYearMenus: reverseMonthAndYearMenus }),
    );

    const toggleSingleDay = handleBooleanChange((allowSingleDayRange: boolean) =>
        setState({ ...state, allowSingleDayRange: allowSingleDayRange }),
    );

    const toggleSingleMonth = handleBooleanChange((singleMonthOnly: boolean) =>
        setState({ ...state, singleMonthOnly: singleMonthOnly }),
    );

    const toggleShortcuts = handleBooleanChange((shortcuts: boolean) => setState({ ...state, shortcuts: shortcuts }));

    const toggleContiguousCalendarMonths = handleBooleanChange((contiguousCalendarMonths: boolean) => {
        setState({ ...state, contiguousCalendarMonths: contiguousCalendarMonths });
    });

    const handleDateChange = (dateRange: DateRange) => setState({ ...state, dateRange: dateRange });

    const renderSelectMenu = (
        label: string,
        selectedValue: number | string,
        options: IDateOption[],
        onChange: React.FormEventHandler<HTMLElement>,
    ) => {
        return (
            <Label>
                {label}
                <HTMLSelect value={selectedValue} onChange={onChange}>
                    {options.map((opt, i) => (
                        <option key={i} value={i} label={opt.label} />
                    ))}
                </HTMLSelect>
            </Label>
        );
    };

    const minDate = MIN_DATE_OPTIONS[state.minDateIndex].value;
    const maxDate = MAX_DATE_OPTIONS[state.maxDateIndex].value;

    const options = (
        <>
            <div>
                <H5>Props</H5>
                <Switch checked={state.allowSingleDayRange} label="Allow single day range" onChange={toggleSingleDay} />
                <Switch checked={state.singleMonthOnly} label="Single month only" onChange={toggleSingleMonth} />
                <Switch
                    checked={state.contiguousCalendarMonths}
                    label="Constrain to contiguous months"
                    onChange={toggleContiguousCalendarMonths}
                />
                <Switch checked={state.shortcuts} label="Show shortcuts" onChange={toggleShortcuts} />
                <Switch
                    checked={state.reverseMonthAndYearMenus}
                    label="Reverse month and year menus"
                    onChange={toggleReverseMonthAndYearMenus}
                />
            </div>
            <div>
                {renderSelectMenu('Minimum date', state.minDateIndex, MIN_DATE_OPTIONS, handleMinDateIndexChange)}
                {renderSelectMenu('Maximum date', state.maxDateIndex, MAX_DATE_OPTIONS, handleMaxDateIndexChange)}
            </div>
        </>
    );

    return (
        <Example options={options} showOptionsBelowExample={true} {...IExampleProps}>
            <DateRangePicker
                {...state}
                className={Classes.ELEVATION_1}
                maxDate={maxDate}
                minDate={minDate}
                onChange={handleDateChange}
            />
            <MomentDateRange withTime={undefined} range={state.dateRange} />
        </Example>
    );
}
