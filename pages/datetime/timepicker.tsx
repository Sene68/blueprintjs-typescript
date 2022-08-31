import React, { useState } from 'react';

import { Classes, H5, HTMLSelect, Switch } from '@blueprintjs/core';
import { TimePicker, TimePrecision } from '@blueprintjs/datetime';
// tslint:disable-next-line:no-submodule-imports
import { getDefaultMaxTime, getDefaultMinTime } from '@blueprintjs/datetime/lib/esm/common/timeUnit';
import { Example, IExampleProps, handleNumberChange, handleValueChange } from '@blueprintjs/docs-theme';

import { PrecisionSelect } from '../../components/common/precisionSelect';

import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

export interface ITimePickerExampleState {
    autoFocus: boolean;
    precision?: TimePrecision;
    selectAllOnFocus?: boolean;
    showArrowButtons?: boolean;
    disabled?: boolean;
    minTime?: Date;
    maxTime?: Date;
    useAmPm?: boolean;
}

enum MinimumHours {
    NONE = 0,
    SIX_PM = 18,
}

enum MaximumHours {
    NONE = 0,
    SIX_PM = 18,
    NINE_PM = 21,
    TWO_AM = 2,
}

export default function TimePickerExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<ITimePickerExampleState>({
        autoFocus: true,
        disabled: false,
        precision: TimePrecision.MINUTE,
        selectAllOnFocus: false,
        showArrowButtons: false,
        useAmPm: false,
    });

    const handlePrecisionChange = handleValueChange((precision: TimePrecision) =>
        setState({ ...state, precision: precision }),
    );

    const toggleShowArrowButtons = () => {
        setState({ ...state, showArrowButtons: !state.showArrowButtons });
    };

    const toggleSelectAllOnFocus = () => {
        setState({ ...state, selectAllOnFocus: !state.selectAllOnFocus });
    };

    const toggleDisabled = () => {
        setState({ ...state, disabled: !state.disabled });
    };

    const toggleUseAmPm = () => {
        setState({ ...state, useAmPm: !state.useAmPm });
    };

    const toggleAutoFocus = () => {
        setState({ ...state, autoFocus: !state.autoFocus });
    };

    const changeMinHour = (hour: MinimumHours) => {
        let minTime = new Date(1995, 6, 30, hour);

        if (hour === MinimumHours.NONE) {
            minTime = getDefaultMinTime();
        }

        setState({ ...state, minTime: minTime });
    };

    const changeMaxHour = (hour: MaximumHours) => {
        let maxTime = new Date(1995, 6, 30, hour);

        if (hour === MaximumHours.NONE) {
            maxTime = getDefaultMaxTime();
        }

        setState({ ...state, maxTime: maxTime });
    };

    const options = (
        <>
            <H5>Props</H5>
            <Switch checked={state.selectAllOnFocus} label="Select all on focus" onChange={toggleSelectAllOnFocus} />
            <Switch checked={state.showArrowButtons} label="Show arrow buttons" onChange={toggleShowArrowButtons} />
            <Switch checked={state.disabled} label="Disabled" onChange={toggleDisabled} />
            <Switch checked={state.useAmPm} label="Use AM/PM" onChange={toggleUseAmPm} />
            <Switch checked={state.autoFocus} label="Auto focus" onChange={toggleAutoFocus} />
            <PrecisionSelect value={state.precision} onChange={handlePrecisionChange} />
            <label className={Classes.LABEL}>
                Minimum time
                <HTMLSelect onChange={handleNumberChange(changeMinHour)}>
                    <option value={MinimumHours.NONE}>None</option>
                    <option value={MinimumHours.SIX_PM}>6pm (18:00)</option>
                </HTMLSelect>
            </label>
            <label className={Classes.LABEL}>
                Maximum time
                <HTMLSelect onChange={handleNumberChange(changeMaxHour)}>
                    <option value={MaximumHours.NONE}>None</option>
                    <option value={MaximumHours.SIX_PM}>6pm (18:00)</option>
                    <option value={MaximumHours.NINE_PM}>9pm (21:00)</option>
                    <option value={MaximumHours.TWO_AM}>2am (02:00)</option>
                </HTMLSelect>
            </label>
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <TimePicker {...state} />
        </Example>
    );
}

// export class TimePickerExample extends React.PureComponent<ExampleProps, ITimePickerExampleState> {
//     public state = {
//         autoFocus: true,
//         disabled: false,
//         precision: TimePrecision.MINUTE,
//         selectAllOnFocus: false,
//         showArrowButtons: false,
//         useAmPm: false,
//     };

//     private handlePrecisionChange = handleValueChange((precision: TimePrecision) => setState({ precision }));

//     public render() {
//         return (
//             <Example options={renderOptions()} {...props}>
//                 <TimePicker {...state} />
//             </Example>
//         );
//     }

//     protected renderOptions() {
//         return (
//             <>
//                 <H5>Props</H5>
//                 <Switch
//                     checked={state.selectAllOnFocus}
//                     label="Select all on focus"
//                     onChange={toggleSelectAllOnFocus}
//                 />
//                 <Switch
//                     checked={state.showArrowButtons}
//                     label="Show arrow buttons"
//                     onChange={toggleShowArrowButtons}
//                 />
//                 <Switch checked={state.disabled} label="Disabled" onChange={toggleDisabled} />
//                 <Switch checked={state.useAmPm} label="Use AM/PM" onChange={toggleUseAmPm} />
//                 <Switch checked={state.autoFocus} label="Auto focus" onChange={toggleAutoFocus} />
//                 <PrecisionSelect value={state.precision} onChange={handlePrecisionChange} />
//                 <label className={Classes.LABEL}>
//                     Minimum time
//                     <HTMLSelect onChange={handleNumberChange(changeMinHour)}>
//                         <option value={MinimumHours.NONE}>None</option>
//                         <option value={MinimumHours.SIX_PM}>6pm (18:00)</option>
//                     </HTMLSelect>
//                 </label>
//                 <label className={Classes.LABEL}>
//                     Maximum time
//                     <HTMLSelect onChange={handleNumberChange(changeMaxHour)}>
//                         <option value={MaximumHours.NONE}>None</option>
//                         <option value={MaximumHours.SIX_PM}>6pm (18:00)</option>
//                         <option value={MaximumHours.NINE_PM}>9pm (21:00)</option>
//                         <option value={MaximumHours.TWO_AM}>2am (02:00)</option>
//                     </HTMLSelect>
//                 </label>
//             </>
//         );
//     }

//     private toggleShowArrowButtons = () => {
//         setState({ showArrowButtons: !state.showArrowButtons });
//     };

//     private toggleSelectAllOnFocus = () => {
//         setState({ selectAllOnFocus: !state.selectAllOnFocus });
//     };

//     private toggleDisabled = () => {
//         setState({ disabled: !state.disabled });
//     };

//     private toggleUseAmPm = () => {
//         setState({ useAmPm: !state.useAmPm });
//     };

//     private toggleAutoFocus = () => {
//         setState({ autoFocus: !state.autoFocus });
//     };

//     private changeMinHour = (hour: MinimumHours) => {
//         let minTime = new Date(1995, 6, 30, hour);

//         if (hour === MinimumHours.NONE) {
//             minTime = getDefaultMinTime();
//         }

//         setState({ minTime });
//     };

//     private changeMaxHour = (hour: MaximumHours) => {
//         let maxTime = new Date(1995, 6, 30, hour);

//         if (hour === MaximumHours.NONE) {
//             maxTime = getDefaultMaxTime();
//         }

//         setState({ maxTime });
//     };
// }
