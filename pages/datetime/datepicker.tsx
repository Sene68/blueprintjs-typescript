import React, { useState } from 'react';

import { Classes, H5, Switch } from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';
import { Example, IExampleProps, handleBooleanChange } from '@blueprintjs/docs-theme';
import { MomentDate } from '../../components/common/momentDate';

import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

export interface IDatePickerExampleState {
    date: Date | null;
    highlightCurrentDay: boolean;
    reverseMonthAndYearMenus: boolean;
    shortcuts: boolean;
    showActionsBar: boolean;
}

export default function DatePickerExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IDatePickerExampleState>({
        date: null,
        highlightCurrentDay: false,
        reverseMonthAndYearMenus: false,
        shortcuts: false,
        showActionsBar: false,
    });

    const toggleHighlight = handleBooleanChange((highlightCurrentDay: boolean) =>
        setState({ ...state, highlightCurrentDay: highlightCurrentDay }),
    );

    const toggleActionsBar = handleBooleanChange((showActionsBar: boolean) =>
        setState({ ...state, showActionsBar: showActionsBar }),
    );

    const toggleShortcuts = handleBooleanChange((shortcuts: boolean) => setState({ ...state, shortcuts: shortcuts }));

    const toggleReverseMenus = handleBooleanChange((reverse: boolean) =>
        setState({ ...state, reverseMonthAndYearMenus: reverse }),
    );

    const handleDateChange = (date: Date) => setState({ ...state, date: date });

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.showActionsBar} label="Show actions bar" onChange={toggleActionsBar} />
            <Switch checked={state.shortcuts} label="Show shortcuts" onChange={toggleShortcuts} />
            <Switch checked={state.highlightCurrentDay} label="Highlight current day" onChange={toggleHighlight} />
            <Switch
                checked={state.reverseMonthAndYearMenus}
                label="Reverse month and year menus"
                onChange={toggleReverseMenus}
            />
        </>
    );

    return (
        <>
            <Example options={options} {...IExampleProps}>
                <DatePicker className={Classes.ELEVATION_1} onChange={handleDateChange} {...state} />
                <MomentDate date={state.date} withTime={undefined} />
            </Example>
        </>
    );
}
