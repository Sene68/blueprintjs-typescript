import React, { useState } from 'react';

import { H5, Position, Switch } from '@blueprintjs/core';
import { TimezoneSelect } from '@blueprintjs/datetime2';
import { Example, IExampleProps, handleBooleanChange } from '@blueprintjs/docs-theme';

import '@blueprintjs/datetime2/lib/css/blueprint-datetime2.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

export interface TimezoneSelectExampleState {
    disabled: boolean;
    fill: boolean;
    showCustomTarget: boolean;
    showLocalTimezone: boolean;
    timezone: string;
}

export default function TimezoneSelectExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<TimezoneSelectExampleState>({
        disabled: false,
        fill: false,
        showCustomTarget: false,
        showLocalTimezone: true,
        timezone: '',
    });

    const handleDisabledChange = handleBooleanChange((disabled: boolean) => setState({ ...state, disabled: disabled }));

    const handleFillChange = handleBooleanChange((fill: boolean) => setState({ ...state, fill: fill }));

    const handleShowLocalChange = handleBooleanChange((showLocalTimezone: boolean) =>
        setState({ ...state, showLocalTimezone: showLocalTimezone }),
    );

    const handleTimezoneChange = (timezone: string) => setState({ ...state, timezone: timezone });

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.showLocalTimezone} label="Show local timezone" onChange={handleShowLocalChange} />
            <Switch checked={state.disabled} label="Disabled" onChange={handleDisabledChange} />
            <Switch label="Fill container width" checked={state.fill} onChange={handleFillChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <TimezoneSelect
                disabled={state.disabled}
                fill={state.fill}
                onChange={handleTimezoneChange}
                popoverProps={{ position: Position.BOTTOM }}
                showLocalTimezone={state.showLocalTimezone}
                value={state.timezone}
            />
        </Example>
    );
}
