import * as React from 'react';

import { HTMLSelect, Intent, Label } from '@blueprintjs/core';

const INTENTS = [
    { label: 'None', value: Intent.NONE },
    { label: 'Primary', value: Intent.PRIMARY },
    { label: 'Success', value: Intent.SUCCESS },
    { label: 'Warning', value: Intent.WARNING },
    { label: 'Danger', value: Intent.DANGER },
];

export interface IIntentSelectProps {
    intent: Intent;
    label?: React.ReactNode;
    onChange: React.FormEventHandler<HTMLSelectElement>;
}

export const IntentSelect: React.FC<IIntentSelectProps> = (props) => (
    <Label>
        {props.label}
        <HTMLSelect value={props.intent} onChange={props.onChange} options={INTENTS} />
    </Label>
);

IntentSelect.defaultProps = {
    label: 'Intent',
};
