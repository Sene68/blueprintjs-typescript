import React, { useState } from "react";

import { FormGroup, H5, InputGroup, Intent, Switch } from "@blueprintjs/core";
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from "@blueprintjs/docs-theme";

import { IntentSelect } from "../../components/common/intentSelect";


import '@blueprintjs/core/lib/css/blueprint.css';

export interface IFormGroupExampleState {
    disabled: boolean;
    helperText: boolean;
    inline: boolean;
    intent: Intent;
    label: boolean;
    subLabel: boolean;
    requiredLabel: boolean;
}

export default function FormGroupExample(IExampleProps: IExampleProps) {
    const [state, setState] = useState<IFormGroupExampleState>({
        disabled: false,
        helperText: false,
        inline: false,
        intent: Intent.NONE,
        label: true,
        requiredLabel: true,
        subLabel: false,
    });

    const handleDisabledChange = handleBooleanChange((disabled: boolean) => setState({ 
        ...state,
        disabled: disabled
    }));

    const handleHelperTextChange = handleBooleanChange((helperText: boolean) => setState({ 
        ...state,
        helperText: helperText
    }));

    const handleInlineChange = handleBooleanChange((inline: boolean) => setState({ 
        ...state,
        inline: inline
    }));

    const handleLabelChange = handleBooleanChange((label: boolean) => setState({ 
        ...state,
        label: label
    }));

    const handleRequiredLabelChange = handleBooleanChange((requiredLabel: boolean) => setState({ 
        ...state,
        requiredLabel: requiredLabel
    }));

    const handleSubLabelChange = handleBooleanChange((subLabel: boolean) => setState({ 
        ...state,
        subLabel: subLabel
    }));

    const handleIntentChange = handleValueChange((intent: Intent) => setState({ 
        ...state,
        intent: intent
    }));


    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Disabled" checked={state.disabled} onChange={handleDisabledChange} />
            <Switch label="Inline" checked={state.inline} onChange={handleInlineChange} />
            <Switch label="Show helper text" checked={state.helperText} onChange={handleHelperTextChange} />
            <Switch label="Show label" checked={state.label} onChange={handleLabelChange} />
            <Switch label="Show label info" checked={state.requiredLabel} onChange={handleRequiredLabelChange} />
            <Switch label="Show sub label" checked={state.subLabel} onChange={handleSubLabelChange} />
            <IntentSelect intent={state.intent} onChange={handleIntentChange} />
        </>
    );

    return (
        <Example options={options} {...IExampleProps} className={"docs-example-formgroup"}>
            <FormGroup
                disabled={state.disabled}
                helperText={state.helperText && "Helper text with details..."}
                inline={state.inline}
                intent={state.intent}
                label={state.label && "Label"}
                labelFor="text-input"
                labelInfo={state.requiredLabel && "(required)"}
                subLabel={state.subLabel && "Label helper text with details..."}
            >
                <InputGroup id="text-input" placeholder="Placeholder text" disabled={state.disabled} intent={state.intent} />
            </FormGroup>
            <FormGroup
                disabled={state.disabled}
                helperText={state.helperText && "Helper text with details..."}
                inline={state.inline}
                intent={state.intent}
                label={state.label && "Label"}
                labelInfo={state.requiredLabel && "(required)"}
            >
                <Switch label="Engage the hyperdrive" disabled={state.disabled} />
                <Switch label="Initiate thrusters" disabled={state.disabled} />
            </FormGroup>
        </Example>
    );
}

