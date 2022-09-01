import * as React from 'react';

import { Radio, RadioGroup } from '@blueprintjs/core';
import { DateFormatProps } from '@blueprintjs/datetime';
import { handleNumberChange } from '@blueprintjs/docs-theme';

export interface DateFormatSelectorProps {
    /** Format options */
    formatOptions: DateFormatProps[];

    /** Selected formatter. */
    format: DateFormatProps;

    /**
     * Optional label for the RadioGroup
     *
     * @default "Date format"
     */
    label?: React.ReactNode;

    /** The callback to fire when a new formatter is chosen. */
    onChange: (format: DateFormatProps) => void;
}

export const DateFormatSelector: React.FC<DateFormatSelectorProps> = (props) => {
    const handleChange = handleNumberChange((index) => {
        props.onChange(props.formatOptions[index]);
    });
    const value = props.formatOptions.indexOf(props.format);

    return (
        <RadioGroup label={props.label ?? 'Date format'} onChange={handleChange} selectedValue={value}>
            {props.formatOptions.map((format, index) => (
                <Radio key={index} label={format.placeholder} value={index} />
            ))}
        </RadioGroup>
    );
};
