import React, { useState } from 'react';

import { Classes, EditableText, FormGroup, H1, H5, Intent, NumericInput, Switch } from '@blueprintjs/core';
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from '@blueprintjs/docs-theme';

import { IntentSelect } from '../../components/common/intentSelect';

import '@blueprintjs/core/lib/css/blueprint.css';

const INPUT_ID = 'EditableTextExample-max-length';

export interface IEditableTextExampleState {
    alwaysRenderInput?: boolean;
    confirmOnEnterKey?: boolean;
    disabled?: boolean;
    intent: Intent;
    maxLength?: number;
    report: string;
    selectAllOnFocus?: boolean;
}

export default function EditableTextExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IEditableTextExampleState>({
        alwaysRenderInput: false,
        confirmOnEnterKey: false,
        disabled: false,
        intent: Intent.NONE,
        maxLength: undefined,
        report: '',
        selectAllOnFocus: false,
    });

    const toggleDisabled = handleBooleanChange((disabled: boolean) =>
        setState({
            ...state,
            disabled: disabled,
        }),
    );

    const handleIntentChange = handleValueChange((intent: Intent) =>
        setState({
            ...state,
            intent: intent,
        }),
    );

    const toggleSelectAll = handleBooleanChange((selectAllOnFocus: boolean) =>
        setState({
            ...state,
            selectAllOnFocus: selectAllOnFocus,
        }),
    );

    const toggleSwap = handleBooleanChange((confirmOnEnterKey: boolean) =>
        setState({
            ...state,
            confirmOnEnterKey: confirmOnEnterKey,
        }),
    );

    const toggleAlwaysRenderInput = handleBooleanChange((alwaysRenderInput: boolean) =>
        setState({
            ...state,
            alwaysRenderInput: alwaysRenderInput,
        }),
    );

    const handleReportChange = (report: string) => {
        setState({
            ...state,
            report: report,
        });
    };

    const handleMaxLengthChange = (maxLength: number) => {
        if (maxLength === 0) {
            setState({
                ...state,
                maxLength: undefined,
            });
        } else {
            const report = state.report.slice(0, maxLength);
            setState({
                ...state,
                maxLength: maxLength,
                report: report,
            });
        }
    };

    const options = (
        <>
            <H5>Props</H5>
            <IntentSelect intent={state.intent} onChange={handleIntentChange} />
            <FormGroup label="Max length" labelFor={INPUT_ID}>
                <NumericInput
                    className={Classes.FORM_CONTENT}
                    fill={true}
                    id={INPUT_ID}
                    max={300}
                    min={0}
                    onValueChange={handleMaxLengthChange}
                    placeholder="Unlimited"
                    value={state.maxLength || ''}
                />
            </FormGroup>
            <Switch checked={state.disabled} label="Disabled" onChange={toggleDisabled} />
            <Switch checked={state.selectAllOnFocus} label="Select all on focus" onChange={toggleSelectAll} />
            <Switch checked={state.confirmOnEnterKey} onChange={toggleSwap}>
                Swap keypress for confirm and newline (multiline only)
            </Switch>
            <Switch checked={state.alwaysRenderInput} label="Always render input" onChange={toggleAlwaysRenderInput} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps}>
            <H1>
                <EditableText
                    alwaysRenderInput={state.alwaysRenderInput}
                    disabled={state.disabled}
                    intent={state.intent}
                    maxLength={state.maxLength}
                    placeholder="Edit title..."
                    selectAllOnFocus={state.selectAllOnFocus}
                />
            </H1>
            <EditableText
                alwaysRenderInput={state.alwaysRenderInput}
                disabled={state.disabled}
                intent={state.intent}
                maxLength={state.maxLength}
                maxLines={12}
                minLines={3}
                multiline={true}
                placeholder="Edit report... (controlled, multiline)"
                selectAllOnFocus={state.selectAllOnFocus}
                confirmOnEnterKey={state.confirmOnEnterKey}
                value={state.report}
                onChange={handleReportChange}
            />
        </Example>
    );
}
